package com.bms.dto;

import com.bms.enums.Gender;

import java.time.LocalDate;

public record CustomerRequestDto(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Gender gender,
        LocalDate dateOfBirth,
        String address,
        String panNumber,
        String aadharNumber
) {
}
