package com.bms.dto;

import java.util.List;

public record LoanApplicationResPageDto(
        long totalRecords,

        int totalPages,

        List<LoanApplicationResDto> data

) {
}
