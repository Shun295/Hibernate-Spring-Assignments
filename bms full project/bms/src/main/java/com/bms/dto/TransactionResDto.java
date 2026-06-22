package com.bms.dto;

import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionResDto(
        String referenceNumber,
        TransactionType transactionType,
        EntryType entryType,
        BigDecimal amount,
        String description,
        String beneficiaryName,
        String beneficiaryAccountNumber,
        BigDecimal balanceAfterTxn,
        TransactionStatus transactionStatus,
        Instant transactionDate
) {
}
