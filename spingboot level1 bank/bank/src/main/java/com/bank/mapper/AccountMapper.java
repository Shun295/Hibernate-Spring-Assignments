package com.bank.mapper;

import com.bank.dto.AccountDto;
import com.bank.dto.AccountResponseDto;
import com.bank.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountMapper {
    public Account mapDtoToEntity(AccountDto accountDto)
    {

        Account account=new Account();
        account.setAccountNumber(accountDto.accountNumber());
        account.setAccountType(accountDto.accountType());
        account.setIfscCode(accountDto.ifscCode());
        account.setBranchName(accountDto.branchName());
        account.setBranchAddress(accountDto.branchAddress());
        account.setBalance(accountDto.balance());

        return account;
    }

    public AccountResponseDto mapEntityToDto(Page<Account> pages) {
        int totalPages=pages.getTotalPages();
        long totalElements=pages.getTotalElements();
        List<Account> accountList=pages.getContent();

        AccountResponseDto accountResponseDto=new AccountResponseDto(totalPages,totalElements,accountList);
        return accountResponseDto;
    }
}
