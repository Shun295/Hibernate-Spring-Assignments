package com.bms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
public record LoanMonitoringDto(

        int loanId,

        String customerName,

        BigDecimal originalLoanAmount,

        BigDecimal totalRepaidAmount,

        BigDecimal balanceAmount,

        BigDecimal emiAmount,

        Double repaymentPercentage,

        LocalDate nextDueDate,

        String status

) {
}