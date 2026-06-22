package com.bms.mapper;

import com.bms.enums.OwnershipStatus;
import com.bms.model.Account;
import com.bms.model.Customer;
import com.bms.model.CustomerAccount;
import org.springframework.stereotype.Component;

@Component
public class CustomerAccountMapper {
    public CustomerAccount toCustomerAccount(Customer customer, Account account) {

        CustomerAccount customerAccount = new CustomerAccount();

        customerAccount.setCustomer(customer);
        customerAccount.setAccount(account);
        customerAccount.setPrimaryHolder(true);
        customerAccount.setOwnershipStatus(OwnershipStatus.ACTIVE);

        return customerAccount;
    }

    public CustomerAccount toJointHolderAccount(Account account) {
        CustomerAccount customerAccount = new CustomerAccount();

        customerAccount.setAccount(account);
        customerAccount.setPrimaryHolder(false);
        customerAccount.setOwnershipStatus(OwnershipStatus.ACTIVE);

        return customerAccount;
    }
}
