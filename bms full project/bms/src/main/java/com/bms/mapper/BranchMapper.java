package com.bms.mapper;

import com.bms.dto.*;
import com.bms.model.Branch;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BranchMapper {
    public static Branch mapDtoToEntity(BranchAdminReqDto dto) {
        Branch branch = new Branch();

        branch.setIfscCode(dto.ifscCode());
        branch.setBranchName(dto.branchName());
        branch.setAddress(dto.address());
        branch.setEmail(dto.email());
        branch.setPhoneNumber(dto.phoneNumber());

        return branch;
    }

    public BranchResponseDto mapEntityToDto(Branch branch) {
        return new BranchResponseDto(
                branch.getId(),
                branch.getIfscCode(),
                branch.getBranchName(),
                branch.getAddress(),
                branch.getEmail(),
                branch.getPhoneNumber(),
                branch.getStatus(),
                branch.getCreatedAt(),
                branch.getUpdatedAt()
        );
    }


    public BranchDropdownResDto mapEntityToDropdownDto(
            Branch branch
    ) {
        return new BranchDropdownResDto(
                branch.getId(),
                branch.getStatus(),
                branch.getBranchName()
        );
    }
}
