package com.bms.dto;

import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record MiniStatementResDto(
        String referenceNumber,
        TransactionType transactionType,
        EntryType entryType,
        BigDecimal amount,
        TransactionStatus transactionStatus,
        Instant transactionDate
) {
}
