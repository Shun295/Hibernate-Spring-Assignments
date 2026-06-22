package com.bms.mapper;

import com.bms.dto.ExecutiveAdminListResponseDto;
import com.bms.dto.ExecutiveAdminResponseDto;
import com.bms.enums.Designation;
import com.bms.enums.Gender;
import com.bms.model.Executive;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;

@Component
public class AdminMapper {
    public ExecutiveAdminListResponseDto mapEntityToDto(Executive executive) {
        return new ExecutiveAdminListResponseDto(
                executive.getId(),
                executive.getEmployeeId(),
                executive.getFirstName(),
                executive.getLastName(),
                executive.getEmail(),
                executive.getPhoneNumber(),
                executive.getDesignation(),
                executive.getBranch().getBranchName()


        );
    }
}
