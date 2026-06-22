package com.bms.dto;

import com.bms.enums.Designation;
import com.bms.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ExecutiveReqUpdateByAdminDto(
        @NotBlank(message = "First name is required")
        String firstName,

        @NotBlank(message = "Last name is required")
        String lastName,

        @NotBlank(message = "Email is required")

        String email,

        @NotBlank(message = "Phone number is required")

        String phoneNumber,

        @NotNull(message = "Gender is required")
        Gender gender,

        @NotNull(message = "Date of birth is required")
        LocalDate dateOfBirth,

        @NotBlank(message = "Address is required")
        String address,

        @NotNull(message = "Branch selection is required")
        Integer branchId,

        @NotNull(message = "Designation is required")
        Designation designation

) {
}
