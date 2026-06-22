package com.bms.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record LoanApplicationResDto(

        int applicationId,

        String loanType,

        BigDecimal principalAmount,

        BigDecimal annualSalary,

        BigDecimal eligibleAmount,

        String remarks,


        BigDecimal interestRate,

        int termInMonth,

        BigDecimal emiAmount,

        BigDecimal totalRepayableAmount,

        String status,

        Instant createdAt

) {
}