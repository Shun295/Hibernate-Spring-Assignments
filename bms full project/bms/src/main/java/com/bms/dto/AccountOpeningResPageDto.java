package com.bms.dto;

import java.util.List;

public record AccountOpeningResPageDto(
        long totalRecords,
        int totalPages,
        List<AccountOpeningExeResDto> data
) {
}
