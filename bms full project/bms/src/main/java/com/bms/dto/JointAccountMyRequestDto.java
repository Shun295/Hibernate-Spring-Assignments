package com.bms.dto;

import com.bms.enums.RequestStatus;

import java.time.Instant;



public record JointAccountMyRequestDto(

        int id,

        String accountNumber,

        String requestedByName,

        String jointHolderName,

        RequestStatus status,

        String remarks,

        String reason,

        Instant createdAt

) {
}