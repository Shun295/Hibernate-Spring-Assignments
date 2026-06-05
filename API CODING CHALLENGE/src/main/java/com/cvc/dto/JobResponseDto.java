package com.cvc.dto;

public record JobResponseDto(
        int id,
        String title,
        String location,
        Double salary,
        String companyName
) {
}
