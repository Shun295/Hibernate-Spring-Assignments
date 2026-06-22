package com.bms.dto;

public record AddAccountHolderReqDto(
        int customerId,
        boolean primaryHolder
) {
}
