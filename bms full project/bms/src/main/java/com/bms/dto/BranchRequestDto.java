package com.bms.dto;

public record BranchRequestDto(
        String ifscCode,
        String branchName,
        String address,
        String email,
        String phoneNumber
) {
}
