package com.bms.dto;

import com.bms.enums.RequestStatus;

import java.time.Instant;

public record AdminAccountClosureResDto(
        int id,
        String accountNumber,
        String customerName,
        String reason,
        RequestStatus reqStatus,
        String remarks,
        String reviewedBy,
        Instant reviewedAt,
        Instant createdAt
) {
}
