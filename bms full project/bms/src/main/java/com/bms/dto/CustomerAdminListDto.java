package com.bms.dto;

public record CustomerAdminListDto(
        int id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        com.bms.enums.Gender gender, int totalAccounts
) {
}
