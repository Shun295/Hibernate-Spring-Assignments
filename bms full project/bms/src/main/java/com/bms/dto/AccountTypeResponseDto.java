package com.bms.dto;

import java.math.BigDecimal;

public record AccountTypeResponseDto(
        int id,
        String AccountType,
        BigDecimal initialDeposit
) {
}
