package com.cms.dto;


public record OfficerResponseDto(
        int officerId,
        String officerName,
        String stationTitle,
        int stationHeadId,
        String stationHeadName
) {
}