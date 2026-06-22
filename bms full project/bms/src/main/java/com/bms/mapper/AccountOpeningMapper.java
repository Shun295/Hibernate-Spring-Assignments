package com.bms.mapper;

import com.bms.dto.*;
import com.bms.enums.RequestStatus;
import com.bms.model.AccountOpeningRequest;
import com.bms.model.AccountType;
import com.bms.model.Customer;
import com.bms.repository.ExecutiveRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class AccountOpeningMapper {

    private ExecutiveRepository executiveRepository;

    public AccountOpeningExeResDto mapEntityToDto(
            AccountOpeningRequest request) {

        return new AccountOpeningExeResDto(
                request.getId(),
                request.getCustomer().getFirstName()
                        + " "
                        + request.getCustomer().getLastName(),
                request.getAccountType().getType(),
                request.getPanDocument(),
                request.getAadharDocument(),
                request.getPhotoDocument(),
                request.getStatus().toString(),
                request.getCreatedAt()
        );
    }


    public CustomerAccountOpeningResDto
    mapCustomerDto(AccountOpeningRequest request) {
        return new CustomerAccountOpeningResDto(
                request.getId(),
                request.getAccountType().getType(),
                request.getStatus().toString(),
                request.getRemarks(),
                request.getCreatedAt()
        );
    }
    public AccountOpeningAdminResDto mapEntityToAdminDto(
            AccountOpeningRequest request) {


        return new AccountOpeningAdminResDto(
                request.getId(),
                request.getCustomer().getId(),
                request.getCustomer().getFirstName()
                        + " "
                        + request.getCustomer().getLastName(),
                request.getAccountType().getId(),
                request.getAccountType().getType(),
                request.getBranch().getId(),
                request.getBranch().getBranchName(),
                request.getRemarks(),
                request.getReviewedBy().getUsername(),
                request.getReviewedAt(),
                request.getStatus().toString()
        );
    }


    public AccountOpeningRequest toEntity(Customer customer, AccountType accountType, String panName, String aadharName, String photoName) {

        AccountOpeningRequest request =
                new AccountOpeningRequest();

        request.setCustomer(customer);
        request.setAccountType(accountType);
        request.setStatus(RequestStatus.PENDING);

        request.setPanDocument(panName);
        request.setAadharDocument(aadharName);
        request.setPhotoDocument(photoName);

        request.setBranch(null);
        request.setReviewedBy(null);
        request.setRemarks(null);
        request.setReviewedAt(null);

        return request;
    }
}
