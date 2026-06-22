package com.bms.dto;

import java.util.List;

public record JointAccountResPageDto(
        long totalRecords,
        int totalPages,
        List<JointAccountResDto> data
) {
}
