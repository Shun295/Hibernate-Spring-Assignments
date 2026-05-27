package com.cms.mapper;

import com.cms.dto.OfficerResponseDto;
import com.cms.dto.OfficerStationDto;
import com.cms.model.Officer;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

@Component
public class OfficerMapper {
    public OfficerResponseDto mapEntityToDto(Officer officer) {
        return new OfficerResponseDto(
                officer.getId(),
                officer.getName(),
                officer.getStation().getStationTitle(),
                officer.getStation().getStationHead().getId(),
                officer.getStation().getStationHead().getName()
        );
    }

    public OfficerStationDto mapDtoForEntity(Officer officer) {
        return new OfficerStationDto(
                officer.getId(),
                officer.getName(),
                officer.getStation().getId(),
                officer.getStation().getAddress()
        );

    }
}
