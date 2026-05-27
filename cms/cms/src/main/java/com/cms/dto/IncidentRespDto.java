package com.cms.dto;

import com.cms.model.Incident;

import java.util.List;

public record IncidentRespDto(
        long totalRecords,
        int totalPages,
        List<Incident> data
) {
}
