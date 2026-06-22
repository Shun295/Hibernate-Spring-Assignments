package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LoanApplicationReqDto(
        @NotNull(message = "Enter the accountId")
        int accountId,
        @NotNull(message = "Enter the Loan Type Id")
        int loanTypeId,
        @NotNull(message = "Enter Principal Amount")
        BigDecimal principalAmount,
        @NotNull(message = "Enter Annual Salary")
        BigDecimal annualSalary,
        @NotNull(message = "Enter the month ")
        int termInMonth
) {
}
