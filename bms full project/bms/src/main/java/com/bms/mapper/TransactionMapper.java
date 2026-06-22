package com.bms.mapper;

import com.bms.dto.*;
import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;
import com.bms.model.Account;
import com.bms.model.Beneficiary;
import com.bms.model.Transaction;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class TransactionMapper {
    public DepositResDto toDepositResDto(Transaction transaction) {
        return new DepositResDto(
                transaction.getReferenceNumber(),
                transaction.getAmount(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionStatus(),
                transaction.getTransactionDate()
        );
    }
    public WithdrawalResDto toWithdrawalResDto(
            Transaction transaction) {

        return new WithdrawalResDto(
                transaction.getReferenceNumber(),
                transaction.getAmount(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionStatus(),
                transaction.getTransactionDate()
        );
    }
    public TransferResDto toTransferResDto(Transaction transaction) {

        return new TransferResDto(
                transaction.getReferenceNumber(),
                transaction.getAmount(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionStatus(),
                transaction.getTransactionDate()
        );
    }

    public TransactionResDto toTransactionResDto(Transaction transaction) {
        return new TransactionResDto(
                transaction.getReferenceNumber(),
                transaction.getTransactionType(),
                transaction.getEntryType(),
                transaction.getAmount(),
                transaction.getDescription(),
                transaction.getBeneficiaryName(),
                transaction.getBeneficiaryAccountNumber(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionStatus(),
                transaction.getTransactionDate()
        );

    }

    public Transaction toDepositTransaction(DepositReqDto dto, Account account, BigDecimal updatedBalance) {

        Transaction transaction = new Transaction();

        transaction.setTransactionType(TransactionType.DEPOSIT);
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setEntryType(EntryType.CREDIT);
        transaction.setAmount(dto.amount());
        transaction.setDescription(dto.description());
        transaction.setBalanceAfterTxn(updatedBalance);
        transaction.setAccount(account);

        return transaction;
    }

    public Transaction toWithdrawalTransaction(WithdrawalReqDto dto, Account account, BigDecimal updatedBalance) {

        Transaction transaction = new Transaction();


        transaction.setTransactionType(TransactionType.WITHDRAWAL);
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setEntryType(EntryType.DEBIT);
        transaction.setAmount(dto.amount());
        transaction.setDescription(dto.description());
        transaction.setBalanceAfterTxn(updatedBalance);
        transaction.setAccount(account);

        return transaction;
    }

    public Transaction toSenderTransferTransaction(TransferReqDto dto, Account senderAccount, Account receiverAccount, BigDecimal senderBalance, Beneficiary beneficiary) {

        Transaction transaction = new Transaction();


        transaction.setTransactionType(TransactionType.TRANSFER);
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setEntryType(EntryType.DEBIT);
        transaction.setAmount(dto.amount());
        transaction.setDescription(dto.description());
        transaction.setBalanceAfterTxn(senderBalance);
        transaction.setAccount(senderAccount);

        transaction.setBeneficiaryAccount(receiverAccount);
        transaction.setBeneficiaryName(beneficiary.getName());
        transaction.setBeneficiaryAccountNumber(
                beneficiary.getAccountNumber());

        return transaction;
    }

    public Transaction toReceiverTransferTransaction(TransferReqDto dto, Account senderAccount, Account receiverAccount, BigDecimal receiverBalance) {

        Transaction transaction = new Transaction();

        transaction.setTransactionType(TransactionType.TRANSFER);
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);
        transaction.setEntryType(EntryType.CREDIT);
        transaction.setAmount(dto.amount());
        transaction.setDescription("Amount Received");
        transaction.setBalanceAfterTxn(receiverBalance);
        transaction.setAccount(receiverAccount);

        transaction.setBeneficiaryAccount(senderAccount);

        return transaction;
    }

    public Transaction toFailedWithdrawalTransaction(Account account, BigDecimal amount, String reason) {

        Transaction transaction = new Transaction();
        transaction.setTransactionType(TransactionType.WITHDRAWAL);

        transaction.setTransactionStatus(TransactionStatus.FAILED);

        transaction.setEntryType(EntryType.DEBIT);

        transaction.setAmount(amount);

        transaction.setDescription(reason);

        transaction.setBalanceAfterTxn(account.getBalance());

        transaction.setAccount(account);

        return transaction;
    }

    public Transaction toFailedTransferTransaction(Account senderAccount, Beneficiary beneficiary, BigDecimal amount, String reason) {

        Transaction transaction = new Transaction();

        transaction.setTransactionType(TransactionType.TRANSFER);

        transaction.setTransactionStatus(TransactionStatus.FAILED);

        transaction.setEntryType(EntryType.DEBIT);

        transaction.setAmount(amount);

        transaction.setDescription(reason);

        transaction.setBalanceAfterTxn(senderAccount.getBalance());

        transaction.setAccount(senderAccount);

        if (beneficiary != null) {
            transaction.setBeneficiaryName(beneficiary.getName());
            transaction.setBeneficiaryAccountNumber(beneficiary.getAccountNumber());
        }

        return transaction;
    }

    public TransactionDetailResDto toTransactionDetailResDto(Transaction transaction) {

        return new TransactionDetailResDto(
                transaction.getReferenceNumber(),
                transaction.getTransactionType(),
                transaction.getTransactionStatus(),
                transaction.getEntryType(),
                transaction.getAmount(),
                transaction.getBeneficiaryName(),
                transaction.getBeneficiaryAccountNumber(),
                transaction.getDescription(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionDate()
        );
    }

    public MiniStatementResDto toMiniStatementResDto(
            Transaction transaction) {

        return new MiniStatementResDto(
                transaction.getReferenceNumber(),
                transaction.getTransactionType(),
                transaction.getEntryType(),
                transaction.getAmount(),
                transaction.getTransactionStatus(),
                transaction.getTransactionDate()
        );
    }

    public StatementResDto toStatementResDto(
            Transaction transaction) {

        return new StatementResDto(
                transaction.getReferenceNumber(),
                transaction.getTransactionType(),
                transaction.getTransactionStatus(),
                transaction.getEntryType(),
                transaction.getAmount(),
                transaction.getDescription(),
                transaction.getBalanceAfterTxn(),
                transaction.getTransactionDate()
        );
    }

    public TransactionMonitoringTableDto
    toTransactionMonitoringTableDto(
            Transaction transaction
    ) {

        return new TransactionMonitoringTableDto(
                transaction.getId(),

                transaction.getReferenceNumber(),

                transaction.getAccount()
                        .getAccountNumber(),

                transaction.getTransactionType()
                        .name(),

                transaction.getAmount(),

                transaction.getTransactionStatus()
                        .name(),

                transaction.getTransactionDate()

        );

    }

    public AdminStatementResDto
    toAdminStatementResDto(
            Transaction transaction) {

        return new AdminStatementResDto(

                transaction.getId(),
                transaction.getReferenceNumber(),

                transaction.getTransactionType(),

                transaction.getTransactionStatus(),

                transaction.getEntryType(),

                transaction.getAmount(),

                transaction.getAccount()
                        .getAccountNumber(),

                transaction.getBeneficiaryName(),

                transaction.getBeneficiaryAccountNumber(),

                transaction.getDescription(),

                transaction.getBalanceAfterTxn(),

                transaction.getTransactionDate()
        );
    }


}
