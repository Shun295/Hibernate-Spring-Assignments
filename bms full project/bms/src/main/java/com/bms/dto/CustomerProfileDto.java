package com.bms.dto;

public record CustomerProfileDto(
        int customerId,

        String fullName,


        String email,

        String phoneNumber,

        String address,

        String username
) {
}
