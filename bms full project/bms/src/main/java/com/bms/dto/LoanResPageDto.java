package com.bms.dto;

import java.util.List;

public record LoanResPageDto(
        long totalRecords,
        int totalPages,
        List<LoanResDto> data
) {
}
