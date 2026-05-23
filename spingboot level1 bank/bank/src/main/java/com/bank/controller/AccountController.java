package com.bank.controller;

import com.bank.exception.ResourceNotFoundException;
import com.bank.model.Account;
import com.bank.service.AccountService;
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

    @PostMapping("/api/account/addAcc")
    public void addAccount(@RequestBody Account account)
    {
        accountService.addAccount(account);
    }

    @GetMapping("/api/account/getAcc/{id}")
    public ResponseEntity<Object> getAccountById(@PathVariable int id)
    {
        try{
            Account account=accountService.getAccountById(id);
            return ResponseEntity.ok(account);
        }
        catch(ResourceNotFoundException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/api/account/delAcc/{id}")
    public ResponseEntity<Object> deleteAccById(@PathVariable int id) {
        try {
            accountService.deleteAccById(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/api/account/updateAcc/{id}")
    public ResponseEntity<Object> updateAccById(@PathVariable int id, @RequestBody Account updatedAcc)
    {
        try{
            accountService.updateAccById(id,updatedAcc);
            return ResponseEntity.ok().build();
        }
        catch (ResourceNotFoundException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
