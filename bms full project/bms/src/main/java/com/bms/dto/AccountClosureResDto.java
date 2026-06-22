package com.bms.dto;

import com.bms.enums.RequestStatus;

import java.time.Instant;

public record AccountClosureResDto(
        int id,
        int accountId,
        int customerId,
        String customerName,
        String reason,
        RequestStatus status,
        String remarks,
        String reviewedBy,
        Instant reviewedAt,
        Instant updatedAt,
        Instant createdAt
) {
}
