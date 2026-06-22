package com.bms.dto;

import java.util.List;

public record TransactionResPageDto(
        long totalRecords,
        int totalPages,
        List<TransactionResDto> data
) {
}
