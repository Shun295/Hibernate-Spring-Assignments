package com.bms.controller;

import com.bms.dto.*;
import com.bms.model.Customer;
import com.bms.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customer")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private CustomerService customerService;

    @GetMapping("/v1/my-profile")
    public CustomerProfileDto getMyProfile(
            Principal principal
    ) {

        return customerService
                .getMyProfile(
                        principal
                );

    }
    //Get all customer
    @GetMapping("/v1/Admin/getAll")
    public CustomerAdminPageDto getAllCustomer(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size)
    {
        return customerService.getAllCustomer(page,size);
    }

    @GetMapping("/v1/Admin/getById/{customerId}")
    public CustomerResponseDto getCustomerById(@PathVariable int customerId)
    {
        return customerService.getCustomerById(customerId);
    }

    @GetMapping("/v1/Admin/username/{username}")
    public CustomerResponseDto getCustomerByUsername(@PathVariable String username) {
        return customerService.getCustomerByUsername(username);
    }

    @GetMapping("/v1/branch/{branchId}")
    public List<CustomerBranchDto>
    getCustomersByBranch(
            @PathVariable int branchId
    ){
        return customerService
                .getCustomersByBranch(
                        branchId
                );
    }

    @GetMapping("/v1/my-branch")
    public List<CustomerBranchDto> getCustomersByMyBranch(Principal principal
    )
    {

        return customerService.getCustomersByMyBranch(principal);

    }

    @GetMapping("/v1/dashboard")
    public CustomerDashboardDto getDashboard(
            Principal principal
    ) {
        return customerService.getDashboard(principal);
    }

    @GetMapping("/v1/monthly-spending")
    public MonthlySpendingDto getMonthlySpending(Principal principal
    ) {
        return customerService.getMonthlySpending(principal);
    }

    @PutMapping("/v1/update/{customerId}")
    public CustomerResponseDto updateCustomer(
            @PathVariable int customerId,
            @RequestBody CustomerResponseDto dto
    ) {
        return customerService.updateCustomer(customerId, dto);
    }
}
