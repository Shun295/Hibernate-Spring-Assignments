package com.bms.dto;

import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record StatementResDto(
        String referenceNumber,
        TransactionType transactionType,
        TransactionStatus transactionStatus,
        EntryType entryType,
        BigDecimal amount,
        String description,
        BigDecimal balanceAfterTxn,
        Instant transactionDate
) {
}
