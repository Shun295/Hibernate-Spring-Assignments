package com.bms.dto;

import java.util.List;

public record AccountPageDto(
        long totalRecords,
        int totalPages,
        List<AccountClosureRespoDto> data
) {
}
