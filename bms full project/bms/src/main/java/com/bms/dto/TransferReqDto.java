package com.bms.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record TransferReqDto(
        @NotNull(message = "enter the account id")
        int accountId,
        @NotNull(message = "enter the beneficiary account id")
        int beneficiaryId,
        BigDecimal amount,
        @NotNull(message = "Enter the description")
        String description
) {
}
