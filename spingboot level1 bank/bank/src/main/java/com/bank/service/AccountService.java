package com.bank.service;

import com.bank.exception.ResourceNotFoundException;
import com.bank.model.Account;
import com.bank.reporistory.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public List<Account> getAllAccount() {
        return accountRepository.findAll();
    }

    public void addAccount(Account account) {
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


}
