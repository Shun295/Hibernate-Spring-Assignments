package com.bms.dto;

import java.util.List;

public record BranchResponsePageDto(
        long totalRecords,
        int totalPages,
        List<BranchResponseDto> data
) {
}
