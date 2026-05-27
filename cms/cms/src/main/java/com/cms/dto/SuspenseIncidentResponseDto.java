package com.cms.dto;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;

public record SuspenseIncidentResponseDto(
        IncidentType incidentType,
        IncidentStatus incidentStatus,
        String incidentDetails,
        String suspectName,
        String suspectContact,
        int suspectId
) {
}
