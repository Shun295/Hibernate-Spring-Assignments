package com.cms.dto;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;

public record SuspectResponseDto(
        String suspectName,
        String suspectContact,
        String suspectCity,
        IncidentType incidentType,
        IncidentStatus incidentStatus,
        String officerName,
        String stationTitle

) {
}
