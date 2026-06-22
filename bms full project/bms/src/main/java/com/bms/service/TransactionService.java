package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.*;
import com.bms.exception.InvalidAmountException;
import com.bms.exception.NotActiveException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.TransactionMapper;
import com.bms.model.*;
import com.bms.repository.*;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TransactionService {
    private TransactionRepository transactionRepository;
    private UserService userService;
    private CustomerRepository customerRepository;
    private CustomerAccountRepository customerAccountRepository;
    private TransactionMapper transactionMapper;
    private AccountRepository accountRepository;
    private BeneficiaryRepository beneficiaryRepository;
    private TransactionAuditService transactionAuditService;
    private UserRepository userRepository;

    @Transactional
    public DepositResDto deposit(Principal principal, DepositReqDto dto) {

        String username = principal.getName();
        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), dto.accountId())
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Account account = customerAccount.getAccount();

        // Account must be ACTIVE
        if (account.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new NotActiveException("Account is not active");
        }

        // Amount must be greater than zero
        if (dto.amount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidAmountException("Amount must be greater than zero");
        }

        BigDecimal updatedBalance = account.getBalance().add(dto.amount());

        account.setBalance(updatedBalance);

        Transaction transaction = transactionMapper.toDepositTransaction(dto, account, updatedBalance);
        transaction.setReferenceNumber(generateReferenceNumber());
        transactionRepository.save(transaction);
        accountRepository.save(account);
        return transactionMapper.toDepositResDto(transaction);
    }

    private String generateReferenceNumber() {
        //adding a transaction prefix
        //format is yyyymmdd
        return "TXN-" + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE)
                + "-" +
                //UUID.randomUUID -gives a unique identifier,converting to string and take only first 8 digits
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();
    }

    @Transactional
    public WithdrawalResDto withdraw(Principal principal, WithdrawalReqDto dto) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), dto.accountId())
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to this customer"));

        Account account = customerAccount.getAccount();

        // Account must be ACTIVE
        if (account.getAccountStatus() != AccountStatus.ACTIVE) {
            transactionAuditService.saveFailedWithdrawalTransaction(account, dto.amount(), "Account is not active");
            throw new NotActiveException("Account is not active");
        }

        // Amount > 0
        if (dto.amount().compareTo(BigDecimal.ZERO) <= 0) {
            transactionAuditService.saveFailedWithdrawalTransaction(account, dto.amount(), "Amount must be greater than zero");
            throw new InvalidAmountException( "Withdrawal amount exceeds available balance. Available Balance: ₹"
                    + account.getBalance());
        }
        // Sufficient Balance
        if (account.getBalance().compareTo(dto.amount()) < 0) {
            transactionAuditService.saveFailedWithdrawalTransaction(account, dto.amount(), "Insufficient balance");
            throw new InvalidAmountException("Insufficient balance");
        }
        BigDecimal updatedBalance = account.getBalance().subtract(dto.amount());
        account.setBalance(updatedBalance);
        String referenceNumber = generateReferenceNumber();
        Transaction transaction = transactionMapper.toWithdrawalTransaction( dto, account, updatedBalance);
        transaction.setReferenceNumber(referenceNumber);
        transactionRepository.save(transaction);
        accountRepository.save(account);
        return transactionMapper.toWithdrawalResDto(transaction);
    }


    @Transactional
    public TransferResDto transfer(Principal principal, TransferReqDto dto) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), dto.accountId())
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Account senderAccount = customerAccount.getAccount();

        if (senderAccount.getAccountStatus() != AccountStatus.ACTIVE) {

            transactionAuditService.saveFailedTransferTransaction(senderAccount, null, dto.amount(), "Sender account is not active");

            throw new NotActiveException("Sender account is not active");
        }

        Beneficiary beneficiary = beneficiaryRepository.findByIdAndCustomer(dto.beneficiaryId(), customer)
                        .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));

        if (beneficiary.getBeneficiaryStatus() != BeneficiaryStatus.ACTIVE) {
            transactionAuditService.saveFailedTransferTransaction(senderAccount, beneficiary, dto.amount(), "Beneficiary is not active");
            throw new NotActiveException("Beneficiary is not active");
        }

        if (dto.amount().compareTo(BigDecimal.ZERO) <= 0) {
            transactionAuditService.saveFailedTransferTransaction(senderAccount, beneficiary, dto.amount(), "Amount must be greater than zero");
            throw new InvalidAmountException("Amount must be greater than zero");
        }

        if (senderAccount.getBalance().compareTo(dto.amount()) < 0) {
            transactionAuditService.saveFailedTransferTransaction(senderAccount, beneficiary, dto.amount(), "Insufficient balance");
            throw new InvalidAmountException("Insufficient balance");
        }

        Account receiverAccount = accountRepository.findByAccountNumber(beneficiary.getAccountNumber())
                        .orElseThrow(() -> new ResourceNotFoundException("Receiver account not found"));

        if (senderAccount.getAccountNumber().equals(receiverAccount.getAccountNumber())) {

            transactionAuditService.saveFailedTransferTransaction(senderAccount, beneficiary, dto.amount(),
                            "Cannot transfer to the same account");

            throw new InvalidAmountException("Cannot transfer to the same account");
        }
        if (receiverAccount.getAccountStatus() != AccountStatus.ACTIVE) {
            transactionAuditService.saveFailedTransferTransaction(senderAccount, beneficiary, dto.amount(), "Receiver account is not active");
            throw new NotActiveException("Receiver account is not active");
        }

        BigDecimal senderBalance = senderAccount.getBalance().subtract(dto.amount());

        senderAccount.setBalance(senderBalance);

        BigDecimal receiverBalance = receiverAccount.getBalance().add(dto.amount());

        receiverAccount.setBalance(receiverBalance);

        String referenceNumber = generateReferenceNumber();

        Transaction senderTransaction =  transactionMapper.toSenderTransferTransaction(dto, senderAccount, receiverAccount, senderBalance, beneficiary);
        senderTransaction.setReferenceNumber(referenceNumber);
        Transaction receiverTransaction = transactionMapper.toReceiverTransferTransaction(dto, senderAccount, receiverAccount, receiverBalance);
        receiverTransaction.setReferenceNumber(referenceNumber);
        transactionRepository.save(senderTransaction);

        transactionRepository.save(receiverTransaction);

        accountRepository.save(senderAccount);

        accountRepository.save(receiverAccount);

        return transactionMapper.toTransferResDto(senderTransaction);
    }


    public TransactionResPageDto getTransactionHistory(Principal principal, int accountId, int page, int size) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository
                        .findByCustomerIdAndAccountId(customer.getId(), accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Account account = customerAccount.getAccount();

        Pageable pageable = PageRequest.of(page,size);

        Page<Transaction> transactionPage = transactionRepository.getTransactionHistory(account.getId(), pageable);

        List<TransactionResDto> transactions = transactionPage.getContent()
                        .stream()
                        .map(transactionMapper::toTransactionResDto)
                        .toList();

        return new TransactionResPageDto(
                transactionPage.getTotalElements(),
                transactionPage.getTotalPages(),
                transactions
        );
    }

    public TransactionResDto getTransactionDetails(
            Principal principal,
            int id
    ) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));

        Transaction transaction = transactionRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Transaction not found"
                        ));

        if (user.getRole() == Role.CUSTOMER) {

            Customer customer = customerRepository
                    .getByUserUsername(principal.getName())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Customer not found"
                            ));

            boolean isAuthorized =
                    customerAccountRepository
                            .existsByCustomerIdAndAccountId(
                                    customer.getId(),
                                    transaction.getAccount().getId()
                            );

            if (!isAuthorized) {

                throw new RuntimeException(
                        "You are not authorized"
                );

            }

        }

        return transactionMapper
                .toTransactionResDto(transaction);

    }

    public List<MiniStatementResDto> getMiniStatement(
            Principal principal,
            int accountId) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username).orElseThrow(() ->
                                new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount =
                customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Pageable pageable = PageRequest.of(0, 5);

        Page<Transaction> transactionPage = transactionRepository.getMiniStatement(accountId, pageable);

        return transactionPage
                .getContent()
                .stream()
                .map(transactionMapper::toMiniStatementResDto)
                .toList();
    }


    public List<StatementResDto> getStatement(Principal principal, int accountId, LocalDate startDate, LocalDate endDate) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Account account = customerAccount.getAccount();

        Instant start = startDate.atStartOfDay().toInstant(ZoneOffset.UTC);

        Instant end = endDate.plusDays(1)
                        .atStartOfDay()
                        .minusSeconds(1)
                        .toInstant(ZoneOffset.UTC);

        List<Transaction> transactions = transactionRepository
                        .getStatement(
                                account.getId(),
                                start,
                                end);

        return transactions.stream()
                .map(transactionMapper::toStatementResDto)
                .toList();
    }

    public TransactionSummaryResDto getTransactionSummary(
            Principal principal,
            int accountId) {

        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByCustomerIdAndAccountId(customer.getId(), accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account does not belong to customer"));

        Account account = customerAccount.getAccount();

        BigDecimal totalDeposits = transactionRepository.getTotalDeposits(account.getId());

        BigDecimal totalWithdrawals = transactionRepository.getTotalWithdrawals(account.getId());

        BigDecimal totalTransfers = transactionRepository.getTotalTransfers(account.getId());

        long failedTransactions = transactionRepository.getFailedTransactionCount(account.getId());

        return new TransactionSummaryResDto(
                account.getBalance(),
                totalDeposits,
                totalWithdrawals,
                totalTransfers,
                failedTransactions
        );
    }


    public TransactionMonitoringDto getTransactionMonitoring(
            int accountId
    ) {

        Account account = accountRepository.findById(accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        List<Transaction> transactions = transactionRepository.findByAccountId(accountId);

        BigDecimal deposits = BigDecimal.ZERO;

        BigDecimal withdrawals =BigDecimal.ZERO;

        BigDecimal transfers =BigDecimal.ZERO;

        for(Transaction txn : transactions){
            if(txn.getTransactionType() == TransactionType.DEPOSIT){

                deposits =deposits.add(txn.getAmount());
            }
            if(txn.getTransactionType()== TransactionType.WITHDRAWAL){

                withdrawals = withdrawals.add(txn.getAmount());
            }
            if(txn.getTransactionType()== TransactionType.TRANSFER){

                transfers =transfers.add(txn.getAmount()
                        );
            }

        }

        Instant lastTransactionDate = transactions.isEmpty() ? null : transactions.get(transactions.size()-1).getTransactionDate();
        return new TransactionMonitoringDto(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                deposits,
                withdrawals,
                transfers,
                transactions.size(),
                lastTransactionDate
        );

    }

    public TransactionMonitoringPageDto getAllTransactions(int page,int size
    ) {

        // Retrieves all transactions with pagination and sorts them by transaction date in descending order
        Pageable pageable = PageRequest.of(page, size, Sort.by("transactionDate").descending());

        Page<Transaction> transactionPage =transactionRepository.findAll(pageable);

        List<TransactionMonitoringTableDto> dtoList =transactionPage.getContent()
                        .stream()
                        .map(transactionMapper::toTransactionMonitoringTableDto)
                        .toList();

        return new TransactionMonitoringPageDto(transactionPage.getTotalElements(), transactionPage.getTotalPages(), dtoList
        );

    }

    public TransactionResDto getTransactionById(Principal principal, int id) {

        Transaction transaction = transactionRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        return transactionMapper.toTransactionResDto(transaction);
    }

    public TransactionMonitoringPageDto searchTransactions(

            LocalDate startDate,

            LocalDate endDate,

            TransactionType type,

            TransactionStatus status,

            int page,

            int size
    ) {

        Instant start = null;
        Instant end = null;

        if (startDate != null) {

            start = startDate
                    .atStartOfDay(
                            ZoneId.of("Asia/Kolkata")
                    )
                    .toInstant();
        }

        if (endDate != null) {

            end = endDate
                    .plusDays(1)
                    .atStartOfDay(
                            ZoneId.of("Asia/Kolkata")
                    )
                    .minusSeconds(1)
                    .toInstant();
        }

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("transactionDate")
                                .descending()
                );

        Page<Transaction> transactionPage =
                transactionRepository.searchTransactions(
                        start,
                        end,
                        type,
                        status,
                        pageable
                );

        List<TransactionMonitoringTableDto> dtoList =
                transactionPage.getContent()
                        .stream()
                        .map(
                                transactionMapper::
                                        toTransactionMonitoringTableDto
                        )
                        .toList();

        return new TransactionMonitoringPageDto(

                transactionPage.getTotalElements(),

                transactionPage.getTotalPages(),

                dtoList
        );
    }

    public TransactionResPageDto filterCustomerTransactions(
            Principal principal,
            int accountId,
            String referenceNumber,
            TransactionType type,
            TransactionStatus status,
            int page,
            int size
    ) {

        Customer customer = customerRepository
                .getByUserUsername(principal.getName())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found"
                        ));

        boolean authorized =
                customerAccountRepository
                        .existsByCustomerIdAndAccountId(
                                customer.getId(),
                                accountId
                        );

        if (!authorized) {

            throw new RuntimeException(
                    "You are not authorized"
            );

        }

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("transactionDate")
                                .descending()
                );

        Page<Transaction> transactionPage =
                transactionRepository
                        .filterCustomerTransactions(
                                accountId,
                                referenceNumber,
                                type,
                                status,
                                pageable
                        );

        List<TransactionResDto> dtoList =
                transactionPage
                        .getContent()
                        .stream()
                        .map(transactionMapper::toTransactionResDto)
                        .toList();

        return new TransactionResPageDto(
                transactionPage.getTotalElements(),
                transactionPage.getTotalPages(),
                dtoList
        );

    }
}
