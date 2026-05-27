package com.cms.service;

import com.cms.dto.StationDto;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.StationMapper;
import com.cms.model.Incident;
import com.cms.model.Station;
import com.cms.repository.StationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StationService {

    private final StationRepository stationRepository;
    private final IncidentService incidentService;
    private final StationMapper stationMapper;

    public StationDto getStationByIncidentId(int incidentId) {

        Incident incident = incidentService.getIncidentById(incidentId);

        Station station = incident.getOfficer().getStation();

        return stationMapper.getDtoFromEntity(station, incident.getOfficer());
    }

    public Station getStationbyStationBy(int stationId) {
        return stationRepository.findById(stationId).orElseThrow(()->new ResourceNotFoundException("Station not found"));
    }

    /*Another approach
    public IncidentStationDto getStationByIncidentId(int incidentId) {
        Incident incident = incidentService.getById(incidentId);
        Station station = stationRepository.getStationByIncidentId(incidentId);
        // get officer for this incident
        Officer officer = officerService.getByIncidentId(incidentId);

        // convert station to IncidentStationDto
        return StationMapper.fromEntityToDto(station, officer);*/

    }

