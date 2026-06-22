package com.bms.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record LoanApplicationAdminResDto(

        int applicationId,

        int customerId,

        String customerName,

        int accountId,

        String accountNumber,

        int loanTypeId,

        String loanType,

        BigDecimal principalAmount,

        BigDecimal interestRate,

        int termInMonth,

        BigDecimal emiAmount,

        BigDecimal totalRepayableAmount,

        String reviewedByEmployeeId,
        String reviewedByName,

        String remarks,

        Instant reviewedAt,

        String status

) {
}
