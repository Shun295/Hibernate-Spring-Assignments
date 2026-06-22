package com.bms.dto;

import java.util.List;

public record AccountResPageDto(
        long totalRecords,
        int totalPages,
        List<AccountResDto> data
) {
}
