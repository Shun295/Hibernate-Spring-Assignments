package com.cms.mapper;

import com.cms.dto.IncidentDto;
import com.cms.dto.IncidentRespDto;
import com.cms.dto.OfficerDto;
import com.cms.model.Incident;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class IncidentMapper {


    public Incident mapDtoToEntity(IncidentDto dto)
    {
        Incident incident=new Incident();
        incident.setIncidentType(dto.incidentType());
        incident.setProgressDetails(dto.progressDetails());
        incident.setIncidentStatus(dto.incidentStatus());

        return incident;
    }


    public IncidentRespDto mapEntityToDto(Page<Incident> pages) {
        long totalElements=pages.getTotalElements();
        int totalPages=pages.getTotalPages();
        List<Incident> list=pages.getContent();
        IncidentRespDto dto=new IncidentRespDto(
                totalElements,
                totalPages,
                list
        );
        return dto;
    }

    public OfficerDto getDtoFromEntity(Incident incident)
    {
        return new OfficerDto(
                incident.getId(),
                incident.getIncidentType(),
                incident.getProgressDetails(),
                incident.getIncidentStatus(),
                incident.getOfficer().getId(),
                incident.getOfficer().getName(),
                incident.getOfficer().getUser().getId()
        );
    }


}
