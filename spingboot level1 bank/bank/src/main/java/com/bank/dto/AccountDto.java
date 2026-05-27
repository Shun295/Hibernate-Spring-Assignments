package com.bank.dto;

import com.bank.enums.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AccountDto(
        @NotNull(message = "Required field should be filled")
        @NotBlank(message = "Required field should be filled")
        String accountNumber,
        @NotNull(message = "Required field should be filled")
        AccountType accountType,
        @NotNull(message = "Required field should be filled")
        @NotBlank(message = "Required field should be filled")
        String ifscCode,
        @NotNull(message = "Required field should be filled")
        @NotBlank(message = "Required field should be filled")
        String branchName,
        @NotNull(message = "Required field should be filled")
        @NotBlank(message = "Required field should be filled")
        String branchAddress,
        @NotNull(message = "Required field should be filled")
        BigDecimal balance
) {
}
