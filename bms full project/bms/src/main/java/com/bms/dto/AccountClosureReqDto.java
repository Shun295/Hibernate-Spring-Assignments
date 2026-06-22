package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AccountClosureReqDto(
        @NotNull(message = "Account Id can't be null")
        int accountId,
        @NotNull(message = "Give a valid reason")
        String reason
) {
}
