package com.bms.mapper;

import com.bms.dto.*;
import com.bms.enums.RequestStatus;
import com.bms.model.Account;
import com.bms.model.AccountClosureRequest;
import com.bms.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountClosureMapper {
    public AccountClosureRequest mapDtoToEntity(AccountClosureReqDto dto, Customer customer, Account account) {

        AccountClosureRequest request = new AccountClosureRequest();
        request.setReason(dto.reason());
        request.setReqStatus(RequestStatus.PENDING);
        request.setAccount(account);
        request.setCustomer(customer);
        return request;
    }

    public AccountClosureResDto mapEntityToDto(AccountClosureRequest accountClosureRequest) {
   return new AccountClosureResDto(
           accountClosureRequest.getId(),
           accountClosureRequest.getAccount().getId(),
           accountClosureRequest.getCustomer().getId(),
           accountClosureRequest.getCustomer().getFirstName()+" "+accountClosureRequest.getCustomer().getLastName(),
           accountClosureRequest.getReason(),
           accountClosureRequest.getReqStatus(),
           accountClosureRequest.getRemarks(),
           accountClosureRequest.getReviewedBy()!=null?accountClosureRequest.getReviewedBy().getUsername():null,
           accountClosureRequest.getReviewedAt(),
           accountClosureRequest.getUpdatedAt(),
           accountClosureRequest.getCreatedAt()

   );
    }

    public CustomerAccountClosureResDto mapDtoFromEntity(AccountClosureRequest accountClosureRequest) {
        return new CustomerAccountClosureResDto(
                accountClosureRequest.getId(),
                accountClosureRequest.getAccount().getAccountNumber(),
                accountClosureRequest.getReason(),
                accountClosureRequest.getReqStatus(),
                accountClosureRequest.getRemarks(),
                accountClosureRequest.getCreatedAt()
        );

    }


    public AccountClosureRespoDto mapDto(
            AccountClosureRequest accountClosureRequest
    ) {

        return new AccountClosureRespoDto(
                accountClosureRequest.getId(),
                accountClosureRequest.getCustomer().getFirstName()
                        + " "
                        + accountClosureRequest.getCustomer().getLastName(),
                accountClosureRequest.getAccount().getAccountNumber(),
                accountClosureRequest.getAccount().getAccountType().getType(),
                accountClosureRequest.getReason(),
                accountClosureRequest.getReqStatus(),
                accountClosureRequest.getCreatedAt()
        );
    }
}
