package com.bank.controller;

import com.bank.dto.AccountDto;
import com.bank.dto.AccountResponseDto;
import com.bank.model.Account;
import com.bank.service.AccountService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/api/account/allAcc")
    public List<Account> getAllAccount()
    {
        return accountService.getAllAccount();
    }

    @GetMapping("/api/account/allAcc/v2")
    public AccountResponseDto getAllAccountV2(@RequestParam int page,
                                              @RequestParam int size)
    {
        return accountService.getAllAccountPagination(page,size);
    }


    @PostMapping("/api/account/addAcc")
    public void addAccount(@Valid @RequestBody AccountDto accountDto)
    {
        accountService.addAccount(accountDto);
    }

    @GetMapping("/api/account/getAcc/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable int id)
    {
            return ResponseEntity.ok(accountService.getAccountById(id));
    }

    @DeleteMapping("/api/account/delAcc/{id}")
    public void deleteAccById(@PathVariable int id) {
            accountService.deleteAccById(id);
    }

    @PutMapping("/api/account/updateAcc/{id}")
    public void updateAccById(@PathVariable int id, @RequestBody Account updatedAcc)
    {
            accountService.updateAccById(id,updatedAcc);
    }
}
