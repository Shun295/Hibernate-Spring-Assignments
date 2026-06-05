package com.cvc.dto;

import java.util.List;

public record JobResPageDto(
        long totalElements,
        int totalPages,
        List<JobResponseDto> data
) {
}
