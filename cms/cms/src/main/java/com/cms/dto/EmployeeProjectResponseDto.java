package com.cms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;


public record EmployeeProjectResponseDto(
        @NotNull(message = "date should be present")
        LocalDate allotedDate,
        @NotNull(message = "Explain the details of role")
        @NotBlank(message = "Explain the details of role")
        String roleDetails,
        @NotNull(message = "Mention the duration to complete the project")
        @NotBlank(message = "Mention the duration to complete the project")
        String duration
) {
}
