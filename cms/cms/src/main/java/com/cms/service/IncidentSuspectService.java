package com.cms.service;

import com.cms.dto.IncidentSuspectRequestDto;
import com.cms.dto.IncidentSuspectResponseDto;
import com.cms.dto.SuspectResponseDto;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.IncidentSuspectMapper;
import com.cms.mapper.SuspectMapper;
import com.cms.model.Incident;
import com.cms.model.IncidentSuspect;
import com.cms.model.Station;
import com.cms.model.Suspect;
import com.cms.repository.IncidentRepository;
import com.cms.repository.IncidentSuspectRepository;
import com.cms.repository.SuspectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IncidentSuspectService {

    private IncidentSuspectRepository incidentSuspectRepository;
    private IncidentService incidentService;
    private SuspectService suspectService;
    private IncidentSuspectMapper incidentSuspectMapper;
    private StationService stationService;
    private SuspectMapper suspectMapper;

    public void add(int incidentId, int suspectId, IncidentSuspectRequestDto dto) {
        //Fetch incident byIncidentId
        Incident incident = incidentService.getIncidentById(incidentId);

        //Fetch Suspect by suspectId
        Suspect suspect=suspectService.getSuspectById(suspectId);

        //Map dto to IncidentSuspect entity
        IncidentSuspect incidentSuspect = incidentSuspectMapper.mapDtoToEntity(dto);

        //attach incident and suspect to incidentsuspect
        incidentSuspect.setIncident(incident);
        incidentSuspect.setSuspect(suspect);

        incidentSuspectRepository.save(incidentSuspect);
    }

   /* public List<IncidentSuspectResponseDto> getAllSuspectsByIncident(int incidentId) {
        //get incident by incidentid
        Incident incident=incidentService.getIncidentById(incidentId);

        List<IncidentSuspect> list=incidentSuspectRepository.findAll();

        return list
                .stream()
                .map(incidentSuspectMapper::mapEntityToDto)
                .toList();
    }*/



    public List<SuspectResponseDto> getAllSuspectsByStation(int stationId) {
        //fetch the station by stationId
        Station station=stationService.getStationbyStationBy(stationId);
        List<IncidentSuspect> suspect=incidentSuspectRepository.findAllSuspectsBystationId(stationId);
        return suspect
                .stream()
                .map(suspectMapper::toStationResponseDto)
                .toList();
    }

    public List< IncidentSuspectResponseDto> getAllSuspectsByIncident(int incidentId) {
        Incident incident=incidentService.getIncidentById(incidentId);
        return incidentSuspectRepository.getAllSuspectsByIncident1(incidentId);
    }
}
