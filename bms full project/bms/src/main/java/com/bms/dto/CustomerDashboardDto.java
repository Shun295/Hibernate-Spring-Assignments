package com.bms.dto;

import java.math.BigDecimal;

public record CustomerDashboardDto(
        BigDecimal totalBalance,

        long activeAccounts,

        long activeLoans,

        long pendingRequests,
        long totalTransactions,
        long beneficiaries,
        boolean loanReminder
) {
}
