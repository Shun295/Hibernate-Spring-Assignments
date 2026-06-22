package com.bms.dto;

import com.bms.enums.Designation;
import com.bms.enums.Gender;

import java.time.LocalDate;

public record ExecutiveRequestDto(
        String employeeId,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Gender gender,
        LocalDate dateOfBirth,
        String address,
        int branchId,
        Designation designation
) {
}
