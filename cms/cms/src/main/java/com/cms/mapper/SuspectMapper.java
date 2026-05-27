package com.cms.mapper;

import com.cms.dto.SuspectResponseDto;
import com.cms.model.*;
import org.springframework.stereotype.Component;

@Component
public class SuspectMapper {

    public SuspectResponseDto toStationResponseDto(IncidentSuspect incidentSuspect) {

        Suspect suspect = incidentSuspect.getSuspect();
        Incident incident = incidentSuspect.getIncident();
        Officer officer = incident.getOfficer();
        Station station = officer.getStation();

        return new SuspectResponseDto(
                suspect.getName(),
                suspect.getContact(),
                suspect.getCity(),
                incident.getIncidentType(),
                incident.getIncidentStatus(),
                officer.getName(),
                station.getStationTitle()
        );
    }
}
