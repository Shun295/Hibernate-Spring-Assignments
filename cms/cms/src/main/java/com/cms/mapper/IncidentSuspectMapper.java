package com.cms.mapper;

import com.cms.dto.IncidentSuspectRequestDto;
import com.cms.dto.IncidentSuspectResponseDto;
import com.cms.model.IncidentSuspect;
import org.springframework.stereotype.Component;

@Component
public class IncidentSuspectMapper {
    public IncidentSuspect mapDtoToEntity(IncidentSuspectRequestDto dto) {
        IncidentSuspect entity = new IncidentSuspect();
        entity.setDetails(dto.details());
        return entity;
    }

    public IncidentSuspectResponseDto mapEntityToDto(IncidentSuspect incidentSuspect) {
        return new IncidentSuspectResponseDto(
                incidentSuspect.getIncident().getIncidentType(),
                incidentSuspect.getIncident().getIncidentStatus(),
                incidentSuspect.getIncident().getProgressDetails(),
                incidentSuspect.getSuspect().getName(),
                incidentSuspect.getSuspect().getContact(),
                incidentSuspect.getSuspect().getId()
        );
    }
}
