package com.bms.mapper;

import com.bms.dto.AccountTypeRequestDto;
import com.bms.dto.AccountTypeResponseDto;
import com.bms.model.AccountType;
import org.springframework.stereotype.Component;

@Component
public class AccountTypeMapper {

    public AccountType mapDtoToEntity(AccountTypeRequestDto dto)
    {
        AccountType accountType=new AccountType();
        accountType.setType(dto.type());
        accountType.setInitialDeposit(dto.initialDeposit());

        return accountType;
    }

    public AccountTypeResponseDto mapEntityToDto(AccountType accountType)
    {
        return new AccountTypeResponseDto(
                accountType.getId(),
                accountType.getType(),
                accountType.getInitialDeposit()

        );
    }
}
