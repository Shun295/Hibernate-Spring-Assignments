package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoanApplicationRejectDto(
        @NotNull(message = "Enter the remarks")
        @NotBlank(message = "Enter the remarks")
        String remarks
) {
}
