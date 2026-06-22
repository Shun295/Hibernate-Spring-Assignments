package com.bms.dto;

import java.time.Instant;

public record AccountOpeningExeResDto(
        int id,
        String customerName,
        String accountType,
        String panDocument,
        String aadharDocument,
        String photoDocument,
        String status,
        Instant createdAt

) {
}
