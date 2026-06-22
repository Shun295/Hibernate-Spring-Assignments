package com.bms.dto;

import com.bms.enums.Gender;

import java.time.Instant;
import java.time.LocalDate;

public record CustomerResponseDto(
        int id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Gender gender,
        LocalDate dateOfBirth,
        String address,
        String panNumber,
        String aadharNumber,
        String username,
        Instant createdAt,
        Instant updatedAt
) {
}
