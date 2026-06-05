package com.cvc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateJobRequestDto(
        @NotBlank(message = "Title of job is mandatory")
        String title,

        @NotBlank(message = "Describe the job role")
        String description,

        String location,

        @NotNull(message = "Enter the salary of the job")
        Double salary
) {
}
