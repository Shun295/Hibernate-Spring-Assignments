package com.bms.dto;

import com.bms.enums.PaymentMode;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LoanRepaymentReqDto(
        @NotNull(message = "Enter the loan id")
        int loanId,
        BigDecimal repaymentAmount,
        PaymentMode paymentMode
) {
}
