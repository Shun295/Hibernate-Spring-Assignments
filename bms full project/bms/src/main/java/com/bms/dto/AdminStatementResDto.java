package com.bms.dto;

import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;

public record AdminStatementResDto(
        int id,
        String referenceNumber,

        TransactionType transactionType,

        TransactionStatus transactionStatus,

        EntryType entryType,

        BigDecimal amount,

        String accountNumber,

        String beneficiaryName,

        String beneficiaryAccountNumber,

        String description,

        BigDecimal balanceAfterTxn,

        Instant transactionDate
) {
}
