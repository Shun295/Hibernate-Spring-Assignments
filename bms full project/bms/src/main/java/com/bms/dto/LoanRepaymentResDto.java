package com.bms.dto;

import com.bms.enums.PaymentMode;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record LoanRepaymentResDto(
        int repaymentId,

        int loanId,

        BigDecimal repaymentAmount,

        LocalDate repaymentDate,

        String transactionReference,

        PaymentMode paymentMode,

        Instant createdAt
) {
}
