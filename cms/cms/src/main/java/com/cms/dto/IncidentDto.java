package com.cms.dto;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IncidentDto(
        @NotNull(message = "Mention the Incident Type")
        IncidentType incidentType,
        @NotNull(message = "Enter the details of incident")
        @NotBlank @NotNull(message = "Enter the details of incident")
        String progressDetails,
        @NotNull(message = "Mention the Incident Status")
        IncidentStatus incidentStatus) {
}
