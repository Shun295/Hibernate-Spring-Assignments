package com.bms.dto;

import java.time.Instant;

public record JointAccountAdminResDto(
        int id,

        String requestedBy,

        String jointHolder,

        String accountNumber,

        String status,

        String remarks,

        String reviewedBy,

        Instant reviewedAt,

        Instant createdAt
) {
}
