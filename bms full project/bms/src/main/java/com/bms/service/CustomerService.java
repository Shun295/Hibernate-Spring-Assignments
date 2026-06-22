package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.AccountStatus;
import com.bms.enums.LoanStatus;
import com.bms.enums.RequestStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.CustomerMapper;
import com.bms.model.*;
import com.bms.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {

    private CustomerRepository customerRepository;
    private CustomerMapper customerMapper;
    private UserRepository userRepository;
    private final ExecutiveRepository executiveRepository;
    private LoanRepository loanRepository;
    private AccountClosureRequestRepository closureRequestRepository;
    private TransactionRepository transactionRepository;
    private BeneficiaryRepository beneficiaryRepository;
    private CustomerAccountRepository customerAccountRepository;

    public CustomerProfileDto getMyProfile(Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Customer customer = customerRepository.findByUser(user)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return customerMapper.mapToCustomerProfileDto(customer);

    }
    public CustomerResponseDto getCustomerById(int customerId) {
        Customer customer=customerRepository.findById(customerId).orElseThrow(()->new ResourceNotFoundException("Invalid Customer ID"));
        return customerMapper.mapEntityToDto(customer);
    }

    public CustomerResponseDto getCustomerByUsername(String username) {
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return customerMapper.mapEntityToDto(customer);
    }

    public CustomerAdminPageDto getAllCustomer(int page,int size) {
        Pageable pageable= PageRequest.of(page,size);
        Page<Customer> pages=customerRepository.findAll(pageable);
        //getContent
        List<Customer> list=pages.getContent();
        //mapper to dto
        List<CustomerResponseDto> data=list.stream()
                .map(customerMapper::mapEntityToDto)
                .toList();
        //return
        return new CustomerAdminPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );

    }


    public List<CustomerBranchDto> getCustomersByBranch(int branchId)
    {

        return customerRepository.getCustomersByBranch(branchId)
                .stream()
                .map(customerMapper::convertToCustomerBranchDto)
                .toList();
    }

    public List<CustomerBranchDto> getCustomersByMyBranch(Principal principal)
    {
        String username = principal.getName();

        Executive executive = executiveRepository.findByUserUsername(username)
                        .orElseThrow(() -> new RuntimeException("Executive not found"));

        Integer branchId = executive.getBranch().getId();
        return customerRepository
                .getCustomersByBranch(branchId)
                .stream()
                .map(customerMapper::convertToCustomerBranchDto)
                .toList();

    }

    public CustomerDashboardDto getDashboard(Principal principal) {

        Customer customer = customerRepository.findByUserUsername(principal.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<CustomerAccount> accounts = customerAccountRepository.findByCustomerId(customer.getId());

        //extracting only balances
        //starts with zero then add
        //BigDecimal::add -(a,b)->a.add(b)
        BigDecimal totalBalance = accounts.stream()
                        .map(customerAccount -> customerAccount.getAccount().getBalance())
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        long activeAccounts = accounts.stream()
                        .filter(customerAccount -> customerAccount.getAccount().getAccountStatus() == AccountStatus.ACTIVE)
                        .count();

        long activeLoans = loanRepository.countByLoanApplication_Customer_IdAndLoanStatus(customer.getId(), LoanStatus.ACTIVE);
        long pendingRequests = closureRequestRepository.countByCustomerIdAndReqStatus(customer.getId(), RequestStatus.PENDING);
        long totalTransactions = accounts.stream()
                        .mapToLong(
                                customerAccount ->
                                        transactionRepository.countByAccountId(customerAccount.getAccount().getId()))
                        .sum();
        long beneficiaries = beneficiaryRepository.countByCustomerId(customer.getId()
        );

        boolean loanReminder = loanRepository.existsByLoanApplication_Customer_IdAndReminderSentTrue(customer.getId());
        return new CustomerDashboardDto(
                totalBalance,
                activeAccounts,
                activeLoans,
                pendingRequests,
                totalTransactions,
                beneficiaries,
                loanReminder
        );
    }

    public MonthlySpendingDto getMonthlySpending(Principal principal
    ) {

        Customer customer = customerRepository.findByUserUsername(principal.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<CustomerAccount> customerAccounts = customerAccountRepository.findByCustomerId(customer.getId());

        List<Integer> accountIds = customerAccounts.stream()
                //for each accout getting account id
                        .map(ca -> ca.getAccount().getId())
                //collecting all id into list
                        .toList();
        //if query returns month 1 2 3 amount 100 200 300 now [[1,100],[2,200],[3,300]]
        //each object is one row in query
        List<Object[]> result = transactionRepository.getMonthlySpending(accountIds);

        //creating list for month names
        List<String> labels = new ArrayList<>();

        //list for spending amount initially [] then later [100,200,300]
        List<BigDecimal> amounts = new ArrayList<>();
        //1->jan
        String[] months = {
                "",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
        };

        //loop through each row
        for(Object[] row : result){

            //getting month num for first row=row[0]=1 so month=1 (jan)
            Integer month = ((Number) row[0]).intValue();
            //getting amount of row
            BigDecimal amount = (BigDecimal) row[1];
            //converting month num to month name month[1]=jan
            labels.add(months[month]);
            amounts.add(amount);
        }
//lables contains ["jan","feb","mar"]
        return new MonthlySpendingDto(labels, amounts);
    }

    public CustomerResponseDto updateCustomer(
            int customerId,
            CustomerResponseDto dto
    ) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Customer ID"));

        customer.setFirstName(dto.firstName());
        customer.setLastName(dto.lastName());
        customer.setEmail(dto.email());
        customer.setPhoneNumber(dto.phoneNumber());
        customer.setAddress(dto.address());

        // Optional
        customer.setGender(dto.gender());
        customer.setDateOfBirth(dto.dateOfBirth());

        Customer updatedCustomer =
                customerRepository.save(customer);

        return customerMapper.mapEntityToDto(updatedCustomer);
    }
}
