package com.bms.dto;

import java.util.List;

public record JointAccountResAdminPageDto(
        long totalRecords,
        int totalPages,
        List<JointAccountAdminResDto> data
) {
}
