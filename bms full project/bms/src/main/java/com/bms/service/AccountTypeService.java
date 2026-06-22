package com.bms.service;

import com.bms.dto.AccountTypeRequestDto;
import com.bms.dto.AccountTypeResponseDto;
import com.bms.mapper.AccountTypeMapper;
import com.bms.model.AccountType;
import com.bms.repository.AccountTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountTypeService {

    private AccountTypeRepository accountTypeRepository;
    private AccountTypeMapper accountTypeMapper;

    public void createAccountType(AccountTypeRequestDto dto) {
         boolean exists = accountTypeRepository.existsByType(dto.type());

    if(exists) {
        throw new IllegalStateException("Account Type already exists");
    }
    AccountType accountType = new AccountType();
    accountType.setType(dto.type());
    accountType.setInitialDeposit(dto.initialDeposit());
    accountTypeRepository.save(accountType);
    }

    public AccountTypeResponseDto getAccountTypeById(int id) {
        AccountType accountType=accountTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invalid account type id"));
        return accountTypeMapper.mapEntityToDto(accountType);
    }

    public List<AccountTypeResponseDto> getAllAccountTypes() {

        List<AccountType> list = accountTypeRepository.findAll();
        return list.stream()
                .map(accountTypeMapper::mapEntityToDto)
                .toList();
    }


}
