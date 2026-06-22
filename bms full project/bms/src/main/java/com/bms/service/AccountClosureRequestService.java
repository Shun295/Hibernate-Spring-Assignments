package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.AccountStatus;
import com.bms.enums.RequestStatus;
import com.bms.exception.InvalidAmountException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.AccountClosureMapper;
import com.bms.model.Account;
import com.bms.model.AccountClosureRequest;
import com.bms.model.Customer;
import com.bms.model.User;
import com.bms.repository.AccountClosureRequestRepository;
import com.bms.repository.AccountRepository;
import com.bms.repository.CustomerRepository;
import com.bms.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountClosureRequestService {
    private final UserService userService;
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final AccountClosureMapper accountClosureMapper;
    private final UserRepository userRepository;
    private final AccountClosureRequestRepository accountClosureRequestRepository;

    public ClosureDashboardDto getClosureDashboardStats() {

        long reviewedRequests = accountClosureRequestRepository.countByReqStatus(RequestStatus.REVIEWED);
        long approvedClosures = accountClosureRequestRepository.countByReqStatus(RequestStatus.APPROVED);
        long rejectedRequests = accountClosureRequestRepository.countByReqStatus(RequestStatus.REJECTED);
        return new ClosureDashboardDto(reviewedRequests, approvedClosures, rejectedRequests);
    }


    public void requestAccClose(AccountClosureReqDto dto, Principal principal) {
        //Get the currently logged-in user from the username stored in the JWT
        String user= principal.getName();
        //Finding the customer record linked to that user.
        Customer customer=customerRepository.findByUserUsername(user)
                .orElseThrow(()->new ResourceNotFoundException("Customer not found"));
        //Finding the account using the accountId
        Account account=accountRepository.findById(dto.accountId())
                .orElseThrow(()->new ResourceNotFoundException("Account not found"));//here dto has accountId im taking that


        if(account.getBalance().compareTo(BigDecimal.ZERO) > 0) {
            throw new InvalidAmountException("Account balance must be zero before closure");
        }
        if(account.getAccountStatus() == AccountStatus.CLOSED) {

            throw new RuntimeException("Account is already closed");
        }
        boolean alreadyPending =accountClosureRequestRepository.existsByAccountIdAndReqStatus(account.getId(), RequestStatus.PENDING);

        if (alreadyPending) {
            throw new ResourceNotFoundException("A pending closure request already exists for this account");
        }
        AccountClosureRequest request=accountClosureMapper.mapDtoToEntity(dto,customer,account);
        accountClosureRequestRepository.save(request);
    }

    public AccountClosureResDto getRequestById(int requestId) {
        AccountClosureRequest accountClosureRequest=accountClosureRequestRepository.findById(requestId)
                .orElseThrow(()->new ResourceNotFoundException("Request not found"));

        return accountClosureMapper.mapEntityToDto(accountClosureRequest);
    }

   /*public List<AccountClosureResDto> getAllClosureRequest() {
       List<AccountClosureRequest> list= accountClosureRequestRepository.findAll();
       return list
               .stream()
               .map(accountClosureMapper::mapEntityToDto)
               .toList();
    }*/

    public List<CustomerAccountClosureResDto> getMyRequests(Principal principal) {
        String user= principal.getName();
        Customer customer=customerRepository.findByUserUsername(user)
                .orElseThrow(()->new ResourceNotFoundException("Customer not found"));

        List<AccountClosureRequest> list=accountClosureRequestRepository.findByCustomer(customer);

        return list
                .stream()
                .map(accountClosureMapper::mapDtoFromEntity)
                .toList();
    }

   /* public List<AccountClosureResDto> getPendingReq() {
        List<AccountClosureRequest> list=accountClosureRequestRepository.findByReqStatus(RequestStatus.PENDING);
        return list
                .stream()
                .map(accountClosureMapper::mapEntityToDto)
                .toList();

    }*/

//    public void approveRequest(int requestId, Principal principal) {
//        AccountClosureRequest request=accountClosureRequestRepository.findById(requestId)
//                .orElseThrow(()->new ResourceNotFoundException("Request not found"));
//
//        User admin=(User) userService.loadUserByUsername(principal.getName());
//        request.setReqStatus(RequestStatus.APPROVED);
//        request.setReviewedBy(admin);
//        request.setReviewedAt(Instant.now());
//        accountClosureRequestRepository.save(request);
//    }

//    public void rejectRequest(int requestId, String remarks,Principal principal) {
//        AccountClosureRequest request=accountClosureRequestRepository.findById(requestId)
//                .orElseThrow(()->new ResourceNotFoundException("Request not found"));
//
//        if(request.getReqStatus()!=RequestStatus.PENDING)
//        {
//            throw new ResourceNotFoundException("Only pending requests can be rejected");
//        }
//        User admin= (User) userService.loadUserByUsername(principal.getName());
//        request.setReqStatus(RequestStatus.REJECTED);
//        request.setReviewedBy(admin);
//        request.setReviewedAt(Instant.now());
//        request.setRemarks(remarks);
//        accountClosureRequestRepository.save(request);
//    }

//    public void cancelRequest(int requestId, Principal principal) {
//        AccountClosureRequest request=accountClosureRequestRepository.findById(requestId)
//                .orElseThrow(()->new ResourceNotFoundException("Request not found"));
//        String user=principal.getName();
//        Customer customer=customerRepository.findByUserUsername(user)
//                .orElseThrow(()->new ResourceNotFoundException("Customer not found"));
//
//        if(request.getCustomer().getId()!=customer.getId())
//        {
//            throw new ResourceNotFoundException("You can delete only your request");
//        }
//
//        if(request.getReqStatus()!=RequestStatus.PENDING)
//        {
//            throw new ResourceNotFoundException("only pending request can be cancelled");
//        }
//
//        request.setReqStatus(RequestStatus.CANCELLED);
//        accountClosureRequestRepository.save(request);
//
//    }

    public void reviewRequest(int requestId, ReviewRequestDto dto, Principal principal) {

        AccountClosureRequest request = accountClosureRequestRepository.findById(requestId)
                .orElseThrow(()->new ResourceNotFoundException("Request not found"));

        if(request.getReqStatus() != RequestStatus.PENDING) {
            throw new ResourceNotFoundException("Only pending requests can be reviewed");
        }

        User executive = (User) userService.loadUserByUsername(principal.getName());
        request.setReqStatus(RequestStatus.REVIEWED);
        request.setReviewedBy(executive);
        request.setReviewedAt(Instant.now());
        request.setRemarks(dto.remarks());
        accountClosureRequestRepository.save(request);
    }

    /*public List<AccountClosureResDto> getReviewedRequests() {

        List<AccountClosureRequest> list = accountClosureRequestRepository.findByReqStatus(RequestStatus.REVIEWED);
        return list.stream()
                .map(accountClosureMapper::mapEntityToDto)
                .toList();
    }*/

    public AccountClosureResPageDto getAllClosureRequest(int page,int size) {
//pagination
        Pageable pageable= PageRequest.of(page,size);
        //repo
        Page<AccountClosureRequest> pages=accountClosureRequestRepository.findAll(pageable);
        //getContent
        List<AccountClosureRequest> list=pages.getContent();
        //convert entity to dto
        List<AccountClosureResDto> data=list.stream()
                .map(accountClosureMapper::mapEntityToDto)
                .toList();
        return new AccountClosureResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public AccountPageDto getPendingReq(int page,int size) {

        Pageable pageable=PageRequest.of(page,size);
        Page<AccountClosureRequest> pages=accountClosureRequestRepository.findByReqStatus(RequestStatus.PENDING,pageable);
        List<AccountClosureRequest> list=pages.getContent();
        List<AccountClosureRespoDto> data=list.stream()
                .map(accountClosureMapper::mapDto)
                .toList();
        return new AccountPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );


    }

    public AccountClosureResPageDto getReviewedRequests(int page,int size) {

        Pageable pageable=PageRequest.of(page,size);
        Page<AccountClosureRequest> pages=accountClosureRequestRepository.findByReqStatus(RequestStatus.REVIEWED,pageable);
        List<AccountClosureRequest> list=pages.getContent();
        List<AccountClosureResDto> data=list.stream()
                .map(accountClosureMapper::mapEntityToDto)
                .toList();
        return new AccountClosureResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );


    }

    public void reviewByAdmin(int requestId, AdminReviewRequestDto dto, Principal principal)
    {
        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        AccountClosureRequest request = accountClosureRequestRepository.findById(requestId)
                        .orElseThrow(() ->new ResourceNotFoundException("Closure request not found"));

        if(request.getReqStatus() != RequestStatus.REVIEWED) {
            throw new RuntimeException("Only reviewed requests can be processed by admin");
        }

        request.setRemarks(dto.remarks());
        request.setReqStatus(dto.status());
        request.setReviewedBy(user);
        accountClosureRequestRepository.save(request);
    }

    public List<AccountClosureResDto> getByStatus(RequestStatus status)
    {
        List<AccountClosureRequest> requests =
                accountClosureRequestRepository.findByReqStatus(status);
                return requests.stream()
                        .map(accountClosureMapper::mapEntityToDto)
                        .toList();
    }

    public List<AccountClosureResDto> searchClosureRequest(String keyword)
    {
        List<AccountClosureRequest> requests = accountClosureRequestRepository.searchClosureRequest(keyword);

         return requests.stream()
                        .map(accountClosureMapper::mapEntityToDto)
                        .toList();
    }

    public AccountClosureRespoDto searchByRequestId(int requestId)
    {
        AccountClosureRequest request = accountClosureRequestRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        return accountClosureMapper.mapDto(request);
    }

    public List<AccountClosureRespoDto> filterByAccountType(String accountType)
    {

        List<AccountClosureRequest> list =accountClosureRequestRepository.filterByAccountType(accountType);

        return list.stream()
                .map(accountClosureMapper::mapDto)
                .toList();
    }
}
