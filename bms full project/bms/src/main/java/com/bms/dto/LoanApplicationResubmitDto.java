package com.bms.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LoanApplicationResubmitDto(
        @NotNull(message = "Enter Principal Amount")
        BigDecimal principalAmount,

        @NotNull(message = "Enter Term In Months")
        Integer termInMonth

) {
}
