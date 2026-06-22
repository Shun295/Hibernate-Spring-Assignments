package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BeneficiaryReqDto(
        @NotNull(message = "Enter the name of the beneficiary account")
        @NotBlank(message = "Enter the name of the beneficiary account")
        String name,
        @NotNull(message = "Enter the Account NUmber")
        @NotBlank(message = "Enter the Account NUmber")
        String accountNumber,
        @NotNull(message = "Enter the Ifsc code")
        @NotBlank(message = "Enter the Ifsc code")
        String ifscCode,
        @NotNull(message = "Enter the Description")
        @NotBlank(message = "Enter the escription")
        String description
) {
}
