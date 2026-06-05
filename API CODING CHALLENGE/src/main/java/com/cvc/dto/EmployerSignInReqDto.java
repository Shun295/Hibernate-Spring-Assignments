package com.cvc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EmployerSignInReqDto(
        @NotBlank(message = "Name of the Employer is required")
        String name,

        @NotBlank(message = "Company name is required")
        String companyName,

        @NotBlank(message = "Username is required")
        String username,

        @NotBlank(message = "Password is required")
        String password

) {
}
