package com.bms.dto;

import com.bms.enums.BranchStatus;

public record BranchDropdownResDto(
        Integer id,
        BranchStatus status,
        String branchName
) {
}
