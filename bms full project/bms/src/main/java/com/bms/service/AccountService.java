package com.bms.service;

import com.bms.dto.AccountHolderResDto;
import com.bms.dto.AccountResDto;
import com.bms.dto.AccountResPageDto;
import com.bms.dto.AddAccountHolderReqDto;
import com.bms.enums.AccountStatus;
import com.bms.enums.OwnershipStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.AccountMapper;
import com.bms.model.*;
import com.bms.repository.AccountRepository;
import com.bms.repository.CustomerAccountRepository;
import com.bms.repository.CustomerRepository;
import com.bms.repository.ExecutiveRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final UserService userService;
    private final CustomerRepository customerRepository;
    private final CustomerAccountRepository customerAccountRepository;
    private final ExecutiveRepository executiveRepository;

    public AccountResDto getAccountById(int accountId) {
        Account account = accountRepository.findById(accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        return accountMapper.mapEntityToDto(account);
    }

    public AccountResPageDto getAllAccounts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Account> pages = accountRepository.findAll(pageable);
        List<Account> list=pages.getContent();
        List<AccountResDto> data=list.stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
        return new AccountResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public AccountResPageDto getMyAccounts(Principal principal, int page, int size
    ) {

        String username = principal.getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<CustomerAccount> pages = customerAccountRepository.findByCustomer(customer, pageable);

        pages.getContent().forEach(ca ->
                System.out.println(ca.getCustomer().getFirstName()
                                + " -> "
                                + ca.getAccount().getAccountNumber()
                )
        );
        List<CustomerAccount> list = pages.getContent();

        List<AccountResDto> data = list.stream()
                .map(CustomerAccount::getAccount)
                .map(accountMapper::mapEntityToDto)
                .toList();

        return new AccountResPageDto(pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public AccountResDto getAccountByNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        return accountMapper.mapEntityToDto(account);
    }

    public AccountResPageDto getAccountsByCustomer(int customerId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<CustomerAccount> pages = customerAccountRepository.findByCustomerId(customerId, pageable);

        //getContent
        List<CustomerAccount> list=pages.getContent();
        //mapper to dto
        List<AccountResDto> data=list.stream()
                .map(CustomerAccount::getAccount)//account is a forign key here
                .map(accountMapper::mapEntityToDto)
                .toList();
        //return
        return new AccountResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public AccountResPageDto getAccountsByBranch(int branchId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Account> pages = accountRepository.findByBranchId(branchId, pageable);
        //getContent
        List<Account> list=pages.getContent();
        //mapper to dto
        List<AccountResDto> data=list.stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
        //return
        return new AccountResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public AccountResPageDto getAccountsByStatus(AccountStatus status, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Account> pages = accountRepository.findByAccountStatus(status, pageable);
        //getContent
        List<Account> list=pages.getContent();
        //mapper to dto
        List<AccountResDto> data=list.stream()
                .map(accountMapper::mapEntityToDto)
                .toList();
        //return
        return new AccountResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public void activateAccount(int accountId) {
        Account account = accountRepository.findById(accountId)
                        .orElseThrow(()->new ResourceNotFoundException("Account not found"));
        if(account.getAccountStatus()==AccountStatus.ACTIVE) {
            throw new ResourceNotFoundException("Account is already active");
        }
        if(account.getAccountStatus()==AccountStatus.CLOSED) {
            throw new ResourceNotFoundException("Closed account cannot be activated");
        }
        account.setAccountStatus(AccountStatus.ACTIVE);
        accountRepository.save(account);
    }

    public void blockAccount(int accountId) {
        Account account = accountRepository.findById(accountId)
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if(account.getAccountStatus()==AccountStatus.BLOCKED) {
            throw new ResourceNotFoundException("Account is already blocked");
        }
        if(account.getAccountStatus()==AccountStatus.CLOSED) {
            throw new ResourceNotFoundException("Closed account cannot be blocked");
        }
        account.setAccountStatus(AccountStatus.BLOCKED);
        accountRepository.save(account);
    }

    public void closeAccount(int accountId) {
        Account account=accountRepository.findById(accountId)
                        .orElseThrow(()->new ResourceNotFoundException("Account not found"));
        if(account.getAccountStatus()==AccountStatus.CLOSED) {
            throw new ResourceNotFoundException("Account is already closed");
        }
        if(account.getAccountStatus()==AccountStatus.BLOCKED) {
            throw new ResourceNotFoundException("Blocked account cannot be closed");
        }
        account.setAccountStatus(AccountStatus.CLOSED);
        accountRepository.save(account);
    }

    public List<AccountHolderResDto> getAccountHolders(int accountId) {
        Account account = accountRepository.findById(accountId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                        "Account not found"));

        List<CustomerAccount> list = customerAccountRepository.findByAccountIdAndOwnershipStatus(accountId, OwnershipStatus.ACTIVE);

        return list.stream()
                .map(accountMapper::mapHolderDto)
                .toList();
    }

    public AccountResPageDto getAccountsByMyBranch(Principal principal, int page, int size)
    {

        String username = principal.getName();

        Executive executive = executiveRepository.findByUserUsername(username)
                        .orElseThrow(() -> new RuntimeException("Executive not found"));

        int branchId = executive.getBranch().getId();
        return getAccountsByBranch(branchId, page, size
        );
    }

}
