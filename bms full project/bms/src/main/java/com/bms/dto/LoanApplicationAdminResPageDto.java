package com.bms.dto;

import java.util.List;

public record LoanApplicationAdminResPageDto(
        long totalRecords,

        int totalPages,

        List<LoanApplicationAdminResDto> data
) {
}
