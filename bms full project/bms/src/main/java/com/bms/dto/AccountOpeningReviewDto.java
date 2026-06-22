package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AccountOpeningReviewDto(
        @NotNull(message = "Branch id is must to enter")
        int branchId,
        @NotNull(message = "Remark should be detailed")
        @NotBlank(message = "Remark should be detailed")
        String remarks

) {
}
