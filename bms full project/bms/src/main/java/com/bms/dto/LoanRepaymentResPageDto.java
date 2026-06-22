package com.bms.dto;

import java.util.List;

public record LoanRepaymentResPageDto(

        long totalRecords,

        int totalPages,

        List<LoanRepaymentResDto> data
) {
}
