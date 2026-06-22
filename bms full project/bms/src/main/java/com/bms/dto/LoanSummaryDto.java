package com.bms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LoanSummaryDto(
        int loanId,

        BigDecimal balanceAmount,

        BigDecimal emiAmount,

        LocalDate nextDueDate
) {
}
