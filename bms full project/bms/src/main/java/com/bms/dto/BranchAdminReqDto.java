package com.bms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record BranchAdminReqDto(
        @NotBlank
        String ifscCode,

        @NotBlank
        String branchName,

        @NotBlank
        String address,

        @Email
        @NotBlank
        String email,

        @NotBlank
        String phoneNumber

) {
}
