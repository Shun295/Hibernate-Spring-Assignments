package com.bms.dto;

import java.time.LocalDate;

public record AccountClosureResponseDto(
        Integer requestId,

        String customerName,

        Long accountNumber,

        LocalDate requestedDate,

        String status,

        String reviewedBy

) {
}
