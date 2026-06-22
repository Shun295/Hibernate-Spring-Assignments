package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record WithdrawalReqDto(
        @NotNull(message = "Enter the account id")
        int accountId,
        BigDecimal amount,
        @NotNull(message = "Enter the description")
        @NotBlank(message = "Enter the description")
        String description
) {
}
