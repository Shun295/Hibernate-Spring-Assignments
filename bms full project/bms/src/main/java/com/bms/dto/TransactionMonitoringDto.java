package com.bms.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionMonitoringDto(
        int accountId,

        String accountNumber,

        BigDecimal currentBalance,

        BigDecimal totalDeposits,

        BigDecimal totalWithdrawals,

        BigDecimal totalTransfers,

        long totalTransactions,

        Instant lastTransactionDate
) {
}
