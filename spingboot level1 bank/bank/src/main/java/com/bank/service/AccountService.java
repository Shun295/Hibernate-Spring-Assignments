package com.bank.service;

import com.bank.dto.AccountDto;
import com.bank.dto.AccountResponseDto;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.AccountMapper;
import com.bank.model.Account;
import com.bank.reporistory.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private AccountMapper accountMapper;

    public List<Account> getAllAccount() {
        return accountRepository.findAll();
    }

    public void addAccount(AccountDto accountDto) {
        Account account=accountMapper.mapDtoToEntity(accountDto);
        accountRepository.save(account);
    }


    public Account getAccountById(int id) {
        return accountRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid id"));
    }

    public void deleteAccById(int id) {
        getAccountById(id);//validation
        accountRepository.deleteById(id);
    }

    public void updateAccById(int id, Account updatedAcc) {
        Account existedAcc=getAccountById(id);
        existedAcc.setAccountType(updatedAcc.getAccountType());
        existedAcc.setIfscCode(updatedAcc.getIfscCode());
        existedAcc.setBranchName(updatedAcc.getBranchName());
        existedAcc.setBranchAddress(updatedAcc.getBranchAddress());

        accountRepository.save(existedAcc);

    }


    public AccountResponseDto getAllAccountPagination(int page, int size) {
        Pageable pageable=PageRequest.of(page,size);
        Page<Account> pages=accountRepository.findAll(pageable);
        return accountMapper.mapEntityToDto(pages);
    }
}
