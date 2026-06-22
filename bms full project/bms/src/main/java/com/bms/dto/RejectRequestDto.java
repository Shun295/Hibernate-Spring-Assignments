package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RejectRequestDto(
        @NotNull(message = "Remark should be detailed")
        @NotBlank(message = "Remark should be detailed")
        String remarks
) {
}
