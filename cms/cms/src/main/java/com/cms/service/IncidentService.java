package com.cms.service;

import com.cms.dto.IncidentDto;
import com.cms.dto.IncidentRespDto;
import com.cms.dto.OfficerDto;
import com.cms.enums.IncidentType;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.IncidentMapper;
import com.cms.model.Incident;
import com.cms.model.Officer;
import com.cms.repository.IncidentRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;
    private OfficerService officerService;
    private final IncidentMapper incidentMapper;

    public List<Incident> getAll() {
        return incidentRepository.findAll();
    }

    public void addIncident(IncidentDto dto)
    {
        Incident incident=incidentMapper.mapDtoToEntity(dto);
        incidentRepository.save(incident);
    }

    public void addOfficerToIncident(@Valid IncidentDto dto, int officerId) {
        Officer officer=officerService.getOfficerById(officerId);
        Incident incident=incidentMapper.mapDtoToEntity(dto);
        incident.setOfficer(officer);
        incidentRepository.save(incident);
    }


    public Incident getIncidentById(int id) {
        return incidentRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid incident id"));
    }

    public void deleteIncidentById(int id) {
        //validation
        getIncidentById(id);
        incidentRepository.deleteById(id);
    }

    public void updateIncident(int id, Incident updatedIncident) {

        Incident existingIncident=getIncidentById(id);
        existingIncident.setIncidentType(updatedIncident.getIncidentType());
        existingIncident.setProgressDetails(updatedIncident.getProgressDetails());
        existingIncident.setIncidentStatus(updatedIncident.getIncidentStatus());

        incidentRepository.save(existingIncident);
    }

   public IncidentRespDto getAllWithPagination(int page, int size)
        {
            Pageable pageable=PageRequest.of(page,size);
            Page<Incident> pages=incidentRepository.findAll(pageable);
            return incidentMapper.mapEntityToDto(pages);
        }


    public List<Incident> getByIncidentType(IncidentType incidentType) {
        return incidentRepository.findByIncidentType(incidentType);
    }

    public List<OfficerDto> getIncidentByOfficerId(int officerId)
    {
        officerService.getOfficerById(officerId);
        List<Incident> incidents=incidentRepository.findByOfficerId(officerId);
        return incidents
                .stream()
                .map(incidentMapper::getDtoFromEntity)
                .toList();
    }

    public List<OfficerDto> getIncidentByOfficerUsername(String officerUsername) {
        Officer officer = officerService.getByUsername(officerUsername);
        // List<Incident>  list = incidentRepository.findByOfficerUserUsername(officerUsername);
        List<Incident>  list = incidentRepository.getByOfficerUserUsernameJpql(officerUsername);
        return list.
                stream()
                .map(incidentMapper :: getDtoFromEntity)
                .toList(); //each incident will be converted into IncidentOfficerDto
    }

}
