package com.bms.dto;

import com.bms.enums.TransactionStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record TransferResDto(
        String referenceNumber,
        BigDecimal transferredAmount,
        BigDecimal updatedBalance,
        TransactionStatus transactionStatus,
        Instant transactionDate
) {
}
