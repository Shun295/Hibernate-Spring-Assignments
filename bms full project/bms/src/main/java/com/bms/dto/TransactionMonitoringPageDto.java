package com.bms.dto;

import java.util.List;

public record TransactionMonitoringPageDto(
        long totalRecords,

        int totalPages,

        List<TransactionMonitoringTableDto> data
) {
}
