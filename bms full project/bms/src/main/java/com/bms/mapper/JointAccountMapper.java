package com.bms.mapper;

import com.bms.dto.*;
import com.bms.model.JointAccountRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JointAccountMapper {

    public JointAccountResDto mapEntityToDto(
            JointAccountRequest request) {

        return new JointAccountResDto(

                request.getId(),
                request.getRequestedBy().getFirstName() + " " + request.getRequestedBy().getLastName(),
                request.getJointHolder().getFirstName() + " " + request.getJointHolder().getLastName(),
                request.getAccount().getAccountNumber(),
                request.getStatus().toString(),
                request.getReason(),
                request.getCreatedAt()
        );
    }



    public JointAccountResAdminPageDto mapPageAdmin(Page<JointAccountRequest> pages) {
        long totalRecords =pages.getTotalElements();
        int totalPages =pages.getTotalPages();
        List<JointAccountAdminResDto> list =
                pages.getContent()
                        .stream()
                        .map(this::mapEntityDto)
                        .toList();

        return new JointAccountResAdminPageDto(
                totalRecords,
                totalPages,
                list);
        
    }

    private JointAccountAdminResDto mapEntityDto(JointAccountRequest jointAccountRequest) {
        return new JointAccountAdminResDto(

                jointAccountRequest.getId(),

                jointAccountRequest.getRequestedBy().getFirstName()
                        + " "
                        + jointAccountRequest.getRequestedBy().getLastName(),

                jointAccountRequest.getJointHolder().getFirstName()
                        + " "
                        + jointAccountRequest.getJointHolder().getLastName(),

                jointAccountRequest.getAccount().getAccountNumber(),

                jointAccountRequest.getStatus().toString(),

                jointAccountRequest.getRemarks(),

                jointAccountRequest.getReviewedBy() != null
                        ? jointAccountRequest.getReviewedBy().getUsername()
                        : null,

                jointAccountRequest.getReviewedAt(),

                jointAccountRequest.getCreatedAt()
        );
    }
    public JointAccountMyRequestDto
    mapDto(
            JointAccountRequest request
    ) {

        return new JointAccountMyRequestDto(

                request.getId(),

                request.getAccount()
                        .getAccountNumber(),

                request.getRequestedBy()
                        .getFirstName()
                        + " "
                        +
                        request.getRequestedBy()
                                .getLastName(),

                request.getJointHolder() != null
                        ?
                        request.getJointHolder()
                                .getFirstName()
                                + " "
                                +
                                request.getJointHolder()
                                        .getLastName()
                        :
                        null,

                request.getStatus(),

                request.getRemarks(),

                request.getReason(),

                request.getCreatedAt()

        );
    }
}
