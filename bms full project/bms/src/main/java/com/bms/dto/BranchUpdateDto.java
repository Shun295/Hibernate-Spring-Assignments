package com.bms.dto;

public record BranchUpdateDto(
        String branchName,
        String address,
        String email,
        String phoneNumber
) {
}
