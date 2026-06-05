package com.cvc.dto;

import java.util.List;

public record ApplicationResPageDto(
        long totalElements,
        int totalPages,
        List<ApplicationResponseDto> data
) {
}
