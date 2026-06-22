package com.bms.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

public record AccountOpeningAdminResDto(
        int requestId,
        int customerId,
        @NotBlank(message = "Customer name cannot be blank")
        String customerName,
        int accountTypeId,
        @NotBlank(message = "Account type cannot be blank")
        String accountType,
        int branchId,
        @NotBlank(message = "Branch name cannot be blank")
        String branchName,
        String remarks,
        String reviewedBy,
        Instant reviewedAt,
        String status
) {
}
