package com.bms.mapper;

import com.bms.dto.*;
import com.bms.model.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public Customer mapDtoToEntity(CustomerRequestDto dto) {
        Customer customer = new Customer();

        customer.setFirstName(dto.firstName());
        customer.setLastName(dto.lastName());
        customer.setEmail(dto.email());
        customer.setPhoneNumber(dto.phoneNumber());
        customer.setGender(dto.gender());
        customer.setDateOfBirth(dto.dateOfBirth());
        customer.setAddress(dto.address());
        customer.setPanNumber(dto.panNumber());
        customer.setAadharNumber(dto.aadharNumber());

        return customer;
    }

    public CustomerResponseDto mapEntityToDto(Customer customer) {
        return new CustomerResponseDto(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getGender(),
                customer.getDateOfBirth(),
                customer.getAddress(),
                customer.getPanNumber(),
                customer.getAadharNumber(),
                customer.getUser().getUsername(),
                customer.getCreatedAt(),
                customer.getUpdatedAt()
        );
    }
    public CustomerAdminListDto mapDtoForEntity(Customer customer) {

        return new CustomerAdminListDto(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getGender(),
                customer.getCustomerAccounts().size()
        );
    }

    public CustomerProfileDto mapToCustomerProfileDto(Customer customer) {

        return new CustomerProfileDto(

                customer.getId(),

                customer.getFirstName()
                        + " "
                        + customer.getLastName(),

                customer.getEmail(),

                customer.getPhoneNumber(),

                customer.getAddress(),

                customer.getUser()
                        .getUsername()
        );
    }

    public CustomerBranchDto
    convertToCustomerBranchDto(
            Customer customer
    )
    {
        return new CustomerBranchDto(

                customer.getId(),

                customer.getFirstName(),

                customer.getLastName(),

                customer.getEmail(),

                customer.getPhoneNumber()

        );
    }
}
