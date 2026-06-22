package com.bms.dto;

import com.bms.enums.Designation;

public record ExecutiveAdminListResponseDto(
        int id,
        String employeeId,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        Designation designation,
        String branchName
) {
}
