package com.bms.dto;

import com.bms.enums.TransactionStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record WithdrawalResDto(
        String referenceNumber,
        BigDecimal withdrawnAmount,
        BigDecimal updatedBalance,
        TransactionStatus transactionStatus,
        Instant transactionDate
) {
}
