package com.bms.dto;

import com.bms.enums.RequestStatus;

import java.time.Instant;

public record AccountClosureRespoDto(
        int id,
        String customerName,
        String accountNumber,
        String accountType,
        String reason,
        RequestStatus status,
        Instant createdAt

) {
}
