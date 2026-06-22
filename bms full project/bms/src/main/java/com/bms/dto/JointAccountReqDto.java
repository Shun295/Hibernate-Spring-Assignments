package com.bms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record JointAccountReqDto(
        @NotNull(message = "Account id not entered")
        int accountId,

        @NotNull(message = "Enter the id of the holder")
        int jointHolderCustomerId,

        @NotBlank(message = "Enter the reason")
        String reason
) {

}
