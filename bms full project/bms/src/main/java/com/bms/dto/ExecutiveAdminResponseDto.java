package com.bms.dto;

import com.bms.enums.Designation;
import com.bms.enums.Gender;

import java.time.Instant;
import java.time.LocalDate;

public record ExecutiveAdminResponseDto(
        int id,
        String employeeId,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Gender gender,
        LocalDate dateOfBirth,
        String address,
        String branchName,
        Designation designation,
        String username,
        Instant createdAt,
        Instant updatedAt


) {
}
