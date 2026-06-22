package com.bms.dto;

import com.bms.enums.RequestStatus;

import java.time.Instant;

public record CustomerAccountClosureResDto(
        int id,
        String accountNumber,
        String reason,
        RequestStatus reqStatus,
        String remarks,
        Instant createdAt
) {
}
