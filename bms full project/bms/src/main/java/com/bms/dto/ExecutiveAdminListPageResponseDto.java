package com.bms.dto;

import java.util.List;

public record ExecutiveAdminListPageResponseDto(
        long totalRecords,
        int totalPages,
        List<ExecutiveAdminListResponseDto> data
) {
}
