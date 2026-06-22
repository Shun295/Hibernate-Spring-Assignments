package com.bms.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionMonitoringTableDto(
        int id,
        String referenceNumber,
        String accountNumber,
        String transactionType,
        BigDecimal amount,
        String transactionStatus,
        Instant transactionDate
) {
}
