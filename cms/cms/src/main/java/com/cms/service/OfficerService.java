package com.cms.service;

import com.cms.dto.OfficerResponseDto;
import com.cms.dto.OfficerStationDto;
import com.cms.exception.ResourceNotFoundException;
import com.cms.mapper.OfficerMapper;
import com.cms.model.Officer;
import com.cms.repository.OfficerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OfficerService {

    private OfficerRepository officerRepository;
    private OfficerMapper officerMapper;
    public Officer getOfficerById(int officerId) {
        return officerRepository.findById(officerId).orElseThrow(()->new ResourceNotFoundException("Invalid officer Id"));

    }

    public Officer getByUsername(String officerUsername) {
        return officerRepository.findByUserUsername(officerUsername);
    }

    public List<OfficerResponseDto> getOfficersByStationHead(String stationHeadUsername) {

        List<Officer> officers =
                officerRepository.findByStationStationHeadUserUsername(stationHeadUsername);

        return officers.stream()
                .map(officerMapper::mapEntityToDto)
                .toList();
    }

    public List<OfficerStationDto> getOfficersByStationTitle(String stationTitle) {
        List<Officer> list=officerRepository.findByStationStationTitle(stationTitle);
        return list
                .stream()
                .map(officerMapper::mapDtoForEntity)
                .toList();
    }

    /*public Officer getByIncidentId(int incidentId) {
        return officerRepository.getByIncidentId(incidentId);
    }*/
}
