package com.bms.dto;


import com.bms.enums.Designation;
import com.bms.enums.Gender;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record ExecutiveReqSignInDto(

        @NotBlank(message = "Employee ID is required")
        String employeeId,

        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(min = 1, max = 50, message = "Last name must be between 1 and 50 characters")
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
        @Size(min = 10, max = 255,
                message = "Address must be between 10 and 255 characters")
        String address,

        @NotNull(message = "Branch selection is required")
        Integer branchId,

        @NotNull(message = "Designation is required")
        Designation designation,

        @NotBlank(message = "Username is required")
        @Size(min = 4, max = 20,
                message = "Username must be between 4 and 20 characters")
        String username
) {
}