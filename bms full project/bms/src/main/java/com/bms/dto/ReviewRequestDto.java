package com.bms.dto;

import com.bms.enums.RequestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReviewRequestDto(
        @NotNull(message = "Give a valid remark")
        @NotBlank(message = "Give a valid remark")
        String remarks
) {
}
