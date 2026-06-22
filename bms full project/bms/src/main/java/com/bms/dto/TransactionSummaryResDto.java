package com.bms.dto;

import java.math.BigDecimal;

public record TransactionSummaryResDto(
        BigDecimal currentBalance,
        BigDecimal totalDeposits,
        BigDecimal totalWithdrawals,
        BigDecimal totalTransfers,
        long failedTransactions
) {
}
