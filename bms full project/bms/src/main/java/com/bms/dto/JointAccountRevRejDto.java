package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JointAccountRevRejDto(
        @NotNull(message = "enter the remarks")
        @NotBlank(message = "Remarks should be detailed")
        String remarks
) {
}
