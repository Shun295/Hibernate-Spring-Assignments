package com.bms.controller;

import com.bms.dto.AccountHolderResDto;
import com.bms.dto.AccountResDto;
import com.bms.dto.AccountResPageDto;
import com.bms.dto.AddAccountHolderReqDto;
import com.bms.enums.AccountStatus;
import com.bms.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/account")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountService accountService;

    //NEED TO CREATE AN ACCOUNT
    //get details of specific acc using accId-admin,executive
    @GetMapping("/{accountId}")
    public AccountResDto getAccountById(@PathVariable int accountId) {
        return accountService.getAccountById(accountId);
    }

    //view all accounts-admin
    @GetMapping("/all")
    public AccountResPageDto getAllAccounts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return accountService.getAllAccounts(page,size);
    }

    //customer to view their accounts-customer
    @GetMapping("/my-accounts")
    public AccountResPageDto getMyAccounts(Principal principal, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return accountService.getMyAccounts(principal,page,size);
    }

    //searching an account using acc num-admin,executive
    @GetMapping("/number/{accountNumber}")
    public AccountResDto getAccountByNumber(@PathVariable String accountNumber) {
        return accountService.getAccountByNumber(accountNumber);
    }

    //viewing all accounts belonging to particular customer -admin,executive
    @GetMapping("/customer/{customerId}")
    public AccountResPageDto getAccountsByCustomer(@PathVariable int customerId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return accountService.getAccountsByCustomer(customerId,page,size);
    }

    //viewing all accounts belonging to specific branch-admin,executive
    @GetMapping("/branch/{branchId}")
    public AccountResPageDto getAccountsByBranch(@PathVariable int branchId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return accountService.getAccountsByBranch(branchId,page,size);
    }

    //get account based on status
    @GetMapping("/status/{status}")
    public AccountResPageDto getAccountsByStatus(@PathVariable AccountStatus status, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return accountService.getAccountsByStatus(status,page,size);
    }

    //to activate an inactive account-admin
    @PutMapping("/{accountId}/activate")
    public void activateAccount(@PathVariable int accountId) {
        accountService.activateAccount(accountId);
    }

    //block an account-admin
    @PutMapping("/{accountId}/block")
    public void blockAccount(@PathVariable int accountId) {
        accountService.blockAccount(accountId);
    }

    //close an account-admin
    @PutMapping("/{accountId}/close")
    public void closeAccount(@PathVariable int accountId) {
        accountService.closeAccount(accountId);
    }

    //view all account holder of an account-admin,executive
    @GetMapping("/{accountId}/holders")
    public List<AccountHolderResDto> getAccountHolders(@PathVariable int accountId) {
        return accountService.getAccountHolders(accountId);
    }

    @GetMapping("/my-branch")
    public AccountResPageDto getAccountsByMyBranch(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    )
    {
        return accountService
                .getAccountsByMyBranch(
                        principal,
                        page,
                        size
                );
    }


}
