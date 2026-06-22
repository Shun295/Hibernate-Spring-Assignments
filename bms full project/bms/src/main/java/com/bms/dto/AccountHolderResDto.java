package com.bms.dto;

public record AccountHolderResDto(
        int customerId,
        String customerName,
        boolean primaryHolder,
        String ownershipStatus
) {
}
