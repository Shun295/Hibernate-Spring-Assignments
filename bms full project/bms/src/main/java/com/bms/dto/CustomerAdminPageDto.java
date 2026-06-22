package com.bms.dto;

import java.util.List;

public record CustomerAdminPageDto(
        long totalRecords,
        int totalPages,
        List<CustomerResponseDto> data
) {
}
