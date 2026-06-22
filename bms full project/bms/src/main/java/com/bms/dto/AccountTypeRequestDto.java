package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AccountTypeRequestDto(
        @NotNull(message = "Enter the type pf account")
        @NotBlank(message = "Enter the type pf account")
        String type,
        @NotNull(message = "Enter the deposit amount")
        BigDecimal initialDeposit
) {
}
