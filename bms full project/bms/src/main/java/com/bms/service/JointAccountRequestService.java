package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.OwnershipStatus;
import com.bms.enums.RequestStatus;
import com.bms.exception.NotReviewedException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.CustomerAccountMapper;
import com.bms.mapper.JointAccountMapper;
import com.bms.model.*;
import com.bms.repository.AccountRepository;
import com.bms.repository.CustomerAccountRepository;
import com.bms.repository.CustomerRepository;
import com.bms.repository.JointAccountRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class JointAccountRequestService {
    private AccountRepository accountRepository;
    private JointAccountRequestRepository jointAccountRequestRepository;
    private CustomerRepository customerRepository;
    private JointAccountMapper jointAccountMapper;
    private CustomerAccountRepository customerAccountRepository;
    private UserService userService;
    private CustomerAccountMapper customerAccountMapper;


    public void createRequest(JointAccountReqDto dto, Principal principal) {

        String user = principal.getName();
        ;

        //fetching the customer who request it
        Customer requestedBy = customerRepository.findByUserUsername(user)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // Fetch the account for which a joint holder is being requested
        Account account = accountRepository.findById(dto.accountId())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        //Fetch the customer who will be added as the joint holder
        Customer jointHolder = customerRepository.findById(dto.jointHolderCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        //Create a new JointAccountRequest entity object
        JointAccountRequest request = new JointAccountRequest();
        //Set the account to which the joint holder will be added
        request.setAccount(account);
        //Set the customer who initiated the request
        request.setRequestedBy(requestedBy);
        //Set the customer who is  the joint holder
        request.setJointHolder(jointHolder);

        //Initially its pending until reviewd by the executive
        request.setStatus(RequestStatus.PENDING);
        request.setReason(
                dto.reason()
        );
        jointAccountRequestRepository.save(request);
    }

    public JointAccountResPageDto getPendingRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<JointAccountRequest> pages = jointAccountRequestRepository.findByStatus(
                RequestStatus.PENDING,
                pageable);
        List<JointAccountRequest> list = pages.getContent();

        List<JointAccountResDto> data = list.stream()
                .map(jointAccountMapper::mapEntityToDto)
                .toList();

        return new JointAccountResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public void approveRequest(int requestId, Principal principal) {
        JointAccountRequest request = jointAccountRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getStatus() != RequestStatus.REVIEWED) {
            throw new NotReviewedException("Only reviewed requests can be approved");
        }

        //admin is the who is going to approve so verifiyinh
        User admin = (User) userService.loadUserByUsername(principal.getName());

        //existby saying true of false whether his customer is already a holder of this accout or not
        boolean exists = customerAccountRepository.existsByCustomerAndAccount(
                request.getJointHolder(),
                request.getAccount());

        if (exists) {
            throw new ResourceNotFoundException("Customer is already a holder");
        }
        CustomerAccount customerAccount = customerAccountMapper.toJointHolderAccount(request.getAccount());
        customerAccount.setCustomer(request.getJointHolder());
        customerAccountRepository.save(customerAccount);

        request.setStatus(RequestStatus.APPROVED);
        request.setReviewedBy(admin);
        request.setReviewedAt(Instant.now());
        jointAccountRequestRepository.save(request);
    }

    public void rejectRequest(int requestId, JointAccountRevRejDto dto, Principal principal) {

        JointAccountRequest request = jointAccountRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getStatus() != RequestStatus.REVIEWED) {
            throw new IllegalStateException("Only reviewed requests can be rejected");
        }

        User admin = (User) userService.loadUserByUsername(principal.getName());
        request.setStatus(RequestStatus.REJECTED);
        request.setRemarks(dto.remarks());
        request.setReviewedBy(admin);
        request.setReviewedAt(Instant.now());
        jointAccountRequestRepository.save(request);
    }

    public void reviewRequest(int requestId, JointAccountRevRejDto dto, Principal principal) {

        JointAccountRequest request =
                jointAccountRequestRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalStateException("Only pending requests can be reviewed");
        }

        User executive = (User) userService.loadUserByUsername(principal.getName());
        request.setRemarks(dto.remarks());
        request.setReviewedBy(executive);
        request.setReviewedAt(Instant.now());
        request.setStatus(RequestStatus.REVIEWED);
        jointAccountRequestRepository.save(request);
    }

    public JointAccountResAdminPageDto getReviewedRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<JointAccountRequest> pages = jointAccountRequestRepository.findByStatus(RequestStatus.REVIEWED, pageable);

        return jointAccountMapper.mapPageAdmin(pages);
    }

    public JointHolderSearchDto searchJointHolder(String accountNumber
    ) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        CustomerAccount customerAccount = customerAccountRepository.findByAccountId(account.getId()).
                        orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Customer customer = customerAccount.getCustomer();

        return new JointHolderSearchDto(
                customer.getId(),
                customer.getFirstName()
                        + " "
                        + customer.getLastName(),
                account.getAccountNumber()

        );

    }
    public List<JointAccountMyRequestDto> getMyRequests(Principal principal) {

        String username = principal.getName();

        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));

        return jointAccountRequestRepository.findByRequestedBy(customer)
                .stream()
                .map(jointAccountMapper::mapDto)
                .toList();
    }
}