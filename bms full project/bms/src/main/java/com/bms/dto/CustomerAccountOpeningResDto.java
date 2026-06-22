package com.bms.dto;

import java.time.Instant;

public record CustomerAccountOpeningResDto(
        int id,
        String accountType,
        String status,
        String remarks,
        Instant createdAt
) {
}
