package com.bms.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record LoanApplicationExeResDto(
        int applicationId,

        int customerId,

        String customerName,

        String loanType,

        BigDecimal principalAmount,
        BigDecimal annualSalary,

        BigDecimal eligibleAmount,

        BigDecimal interestRate,

         int termInMonth,

        BigDecimal emiAmount,

        BigDecimal totalRepayableAmount,

        String status,

        Instant createdAt
) {
}
