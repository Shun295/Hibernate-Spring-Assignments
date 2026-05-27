package com.cms.dto;

public record OfficerStationDto(
        int officerId,
        String officerName,
        int stationId,
        String stationAddress
) {
}
