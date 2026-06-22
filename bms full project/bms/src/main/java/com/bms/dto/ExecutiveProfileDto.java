package com.bms.dto;

import com.bms.enums.Designation;
import com.bms.enums.Gender;
import com.bms.enums.Role;

import java.time.LocalDate;

public record ExecutiveProfileDto(
        Integer id,

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

        String role
) {
}
