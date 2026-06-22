package com.bms.dto;

import com.bms.enums.TransactionStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record DepositResDto(
        String referenceNumber,
        BigDecimal depositedAmount,
        BigDecimal updatedBalance,
        TransactionStatus transactionStatus,
        Instant transactionDate
) {
}
