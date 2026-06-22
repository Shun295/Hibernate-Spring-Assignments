package com.bms.dto;

import com.bms.enums.RequestStatus;

public record AdminReviewRequestDto(

        String remarks,

        RequestStatus status

) {
}