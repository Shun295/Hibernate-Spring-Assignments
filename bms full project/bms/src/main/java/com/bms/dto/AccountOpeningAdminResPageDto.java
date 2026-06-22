package com.bms.dto;

import java.util.List;

public record AccountOpeningAdminResPageDto(
        long totalRecords,
        int totalPages,
        List<AccountOpeningAdminResDto> data
) {
}
