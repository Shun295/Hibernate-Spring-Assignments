package com.bms.controller;

import com.bms.dto.AccountTypeRequestDto;
import com.bms.dto.AccountTypeResponseDto;
import com.bms.service.AccountTypeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountTypeController {

    private AccountTypeService accountTypeService;

    @PostMapping("/api/account-type/create")
    public void createAccountType(@RequestBody AccountTypeRequestDto dto)
    {
        accountTypeService.createAccountType(dto);
    }

    @GetMapping("/api/account-type/{id}")
    public AccountTypeResponseDto getAccountTypeById(@PathVariable int id) {

        return accountTypeService.getAccountTypeById(id);

    }

    @GetMapping("/api/account-type/all")
    public List<AccountTypeResponseDto> getAllAccountTypes() {
        return accountTypeService.getAllAccountTypes();
    }
}

