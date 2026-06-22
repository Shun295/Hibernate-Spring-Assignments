package com.bms.dto;

import java.time.LocalDate;

public record StatementReqDto(
        LocalDate startDate,
        LocalDate endDate
) {
}
