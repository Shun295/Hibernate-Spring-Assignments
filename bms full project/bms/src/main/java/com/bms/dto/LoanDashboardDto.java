package com.bms.dto;

import java.math.BigDecimal;

public record LoanDashboardDto(
        long activeLoans,

        long totalRepayments,

        BigDecimal totalCollection,

        long overdueLoans
) {
}
