package com.bms.dto;

import com.bms.enums.LoanStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record LoanResDto(
        int loanId,
        LoanStatus loanStatus,
        BigDecimal balanceAmount,
        LocalDate startDate,
        LocalDate endDate,
        int loanApplicationId,
        Instant createdAt
) {
}
