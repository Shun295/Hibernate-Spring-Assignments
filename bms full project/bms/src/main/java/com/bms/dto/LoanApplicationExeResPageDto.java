package com.bms.dto;

import java.util.List;

public record LoanApplicationExeResPageDto(
        long totalRecords,
        int totalPages,
        List<LoanApplicationExeResDto> data
)
{
}
