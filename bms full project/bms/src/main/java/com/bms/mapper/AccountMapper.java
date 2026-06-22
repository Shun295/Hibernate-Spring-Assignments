package com.bms.mapper;

import com.bms.dto.AccountHolderResDto;
import com.bms.dto.AccountResDto;
import com.bms.dto.AccountResPageDto;
import com.bms.enums.AccountStatus;
import com.bms.model.Account;
import com.bms.model.AccountOpeningRequest;
import com.bms.model.CustomerAccount;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountMapper {
    public AccountResDto mapEntityToDto(Account account) {
        return new AccountResDto(
                account.getId(),
                account.getAccountNumber(),
                account.getBalance(),
                account.getAccountStatus(),
                account.getAccountType().getType(),
                account.getBranch().getBranchName()
        );
    }



    public AccountHolderResDto mapHolderDto(CustomerAccount customerAccount) {

        return new AccountHolderResDto(
                customerAccount.getCustomer().getId(),
                customerAccount.getCustomer().getFirstName() + " " + customerAccount.getCustomer().getLastName(),
                customerAccount.isPrimaryHolder(),
                customerAccount.getOwnershipStatus().toString()
        );
    }

    public Account toAccount(AccountOpeningRequest request) {

        Account account = new Account();
        account.setBalance(request.getAccountType().getInitialDeposit());
        account.setAccountStatus(AccountStatus.ACTIVE);
        account.setAccountType(request.getAccountType());
        account.setBranch(request.getBranch());

        return account;
    }
}
