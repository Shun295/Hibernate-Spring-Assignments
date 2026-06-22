package com.bms.mapper;

import com.bms.dto.*;
import com.bms.enums.Designation;
import com.bms.model.Branch;
import com.bms.model.Executive;
import org.springframework.stereotype.Component;

@Component
public class ExecutiveMapper {

    public Executive mapDtoToEntity(ExecutiveRequestDto dto) {
        Executive executive = new Executive();

        executive.setEmployeeId(dto.employeeId());
        executive.setFirstName(dto.firstName());
        executive.setLastName(dto.lastName());
        executive.setEmail(dto.email());
        executive.setPhoneNumber(dto.phoneNumber());
        executive.setGender(dto.gender());
        executive.setDateOfBirth(dto.dateOfBirth());
        executive.setAddress(dto.address());
        executive.setDesignation(dto.designation());

        return executive;
    }


    public ExecutiveAdminResponseDto getDtoForEntity(Executive executive)
    {
        return new ExecutiveAdminResponseDto(
                executive.getId(),
                executive.getEmployeeId(),
                executive.getFirstName(),
                executive.getLastName(),
                executive.getEmail(),
                executive.getPhoneNumber(),
                executive.getGender(),
                executive.getDateOfBirth(),
                executive.getAddress(),
                executive.getBranch().getBranchName(),
                executive.getDesignation(),
                executive.getUser().getUsername(),
                executive.getCreatedAt(),
                executive.getUpdatedAt()
        );
    }
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

    public ExecutiveResponseDto entityToDto(Executive executive)
    {
        return new ExecutiveResponseDto(
                executive.getId(),
                executive.getEmployeeId(),
                executive.getFirstName(),
                executive.getLastName(),
                executive.getEmail(),
                executive.getPhoneNumber(),
                executive.getGender(),
                executive.getDateOfBirth(),
                executive.getAddress(),
                executive.getBranch().getId(),
                executive.getBranch().getBranchName(),
                executive.getDesignation(),
                executive.getUser().getUsername()
        );
    }

    public void updateExecutiveByExecutive(
            Executive executive,
            ExecutiveReqUpdateDto dto
    ) {

        executive.setFirstName(dto.firstName());
        executive.setLastName(dto.lastName());
        executive.setEmail(dto.email());
        executive.setPhoneNumber(dto.phoneNumber());
        executive.setAddress(dto.address());
    }

    public void updateExecutiveByAdmin(
            Executive executive,
            ExecutiveReqUpdateByAdminDto dto,
            Branch branch
    ) {

        executive.setFirstName(dto.firstName());
        executive.setLastName(dto.lastName());
        executive.setEmail(dto.email());
        executive.setPhoneNumber(dto.phoneNumber());
        executive.setGender(dto.gender());
        executive.setDateOfBirth(dto.dateOfBirth());
        executive.setAddress(dto.address());
        executive.setDesignation(dto.designation());
        executive.setBranch(branch);
    }

    public ExecutiveProfileDto mapToExecutiveProfileDto(
            Executive executive
    ) {

        return new ExecutiveProfileDto(

                executive.getId(),

                executive.getEmployeeId(),

                executive.getFirstName(),

                executive.getLastName(),

                executive.getEmail(),

                executive.getPhoneNumber(),

                executive.getGender(),

                executive.getDateOfBirth(),

                executive.getAddress(),

                executive.getBranch().getBranchName(),

                executive.getDesignation(),

                executive.getUser().getUsername(),

                executive.getUser().getRole().name()

        );

    }
}
