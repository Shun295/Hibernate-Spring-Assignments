package com.bms.dto;

import com.bms.enums.AccountStatus;

import java.math.BigDecimal;

public record AccountResDto(
        int id,
        String accountNumber,
        BigDecimal balance,
        AccountStatus accountStatus,
        String accountType,
        String branchName
) {
}
