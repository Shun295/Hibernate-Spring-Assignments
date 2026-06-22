package com.bms.dto;

import com.bms.model.AccountClosureRequest;

import java.util.List;

public record AccountClosureResPageDto(
        long totalRecords,
        int totalPages,
        List<AccountClosureResDto> data
) {
}
