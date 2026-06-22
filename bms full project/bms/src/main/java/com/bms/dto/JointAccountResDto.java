package com.bms.dto;

import java.time.Instant;

public record JointAccountResDto(
        int id,
        String requestedBy,
        String jointHolder,
        String accountNumber,
        String status,
        String reason,
        Instant createdAt
) {
}
