package com.bms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record OverdueLoanDto(

        int loanId,

        String customerName,

        BigDecimal balanceAmount,

        BigDecimal emiAmount,

        LocalDate nextDueDate,

        long daysOverdue
) {
}
