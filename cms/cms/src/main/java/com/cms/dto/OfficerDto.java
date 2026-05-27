package com.cms.dto;

import com.cms.enums.IncidentStatus;
import com.cms.enums.IncidentType;

public record OfficerDto(
        int incidentId,
        IncidentType incidentType,
        String progressDetails,
        IncidentStatus incidentStatus,
        int officerId,
        String officerName,
        int userId
) {
}
