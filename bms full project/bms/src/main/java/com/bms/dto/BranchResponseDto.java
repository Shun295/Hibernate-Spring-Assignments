package com.bms.dto;

import com.bms.enums.BranchStatus;

import java.time.Instant;

public record BranchResponseDto(
        int id,
        String ifscCode,
        String branchName,
        String address,
        String email,
        String phoneNumber,
        BranchStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
