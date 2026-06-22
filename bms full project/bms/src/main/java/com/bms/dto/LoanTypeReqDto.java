package com.bms.dto;

import java.math.BigDecimal;

public record LoanTypeReqDto(
        String loanType,
        BigDecimal interestRate,
        int maxTermMonths,
        BigDecimal maxLoanAmount
) {
}
