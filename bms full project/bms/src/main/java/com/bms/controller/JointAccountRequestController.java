package com.bms.controller;

import com.bms.dto.*;
import com.bms.service.AccountService;
import com.bms.service.JointAccountRequestService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/jointAccReq")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class JointAccountRequestController {

    private JointAccountRequestService jointAccountRequestService;

    private AccountService accountService;

    //creating jointacc req  by customer
    @PostMapping("/request")
    public void createRequest(@Valid @RequestBody JointAccountReqDto dto, Principal principal) {

        jointAccountRequestService.createRequest(dto, principal);
    }

    //viewing pending req -by executive
    @GetMapping("/pending")
    public JointAccountResPageDto getPendingRequests(
            @RequestParam int page,
            @RequestParam int size) {

        return jointAccountRequestService.getPendingRequests(page, size);
    }

   // executive review the req
    @PutMapping("/{requestId}/review")
    public void reviewRequest(@PathVariable int requestId, @Valid @RequestBody JointAccountRevRejDto dto, Principal principal) {

        jointAccountRequestService.reviewRequest(requestId,dto,principal);
    }

    //admin only see reviewed req handles by executive
    @GetMapping("/reviewed")
    public JointAccountResAdminPageDto getReviewedRequests(
            @RequestParam int page,
            @RequestParam int size) {

        return jointAccountRequestService.getReviewedRequests(page, size);
    }

    //approve based on the remarks of the executive
    @PutMapping("/{requestId}/approve")
    public void approveRequest(@PathVariable int requestId,Principal principal) {

        jointAccountRequestService.approveRequest(requestId, principal);
    }

    @PutMapping("/{requestId}/reject")
    public void rejectRequest(@PathVariable int requestId,@Valid @RequestBody JointAccountRevRejDto dto, Principal principal) {

        jointAccountRequestService.rejectRequest(requestId, dto, principal);
    }

    @GetMapping("/{accountId}/holders")
    public List<AccountHolderResDto> getAccountHolders(@PathVariable int accountId) {

        return accountService.getAccountHolders(accountId);
    }

    @GetMapping("/search-holder")
    public JointHolderSearchDto searchJointHolder(
            @RequestParam String accountNumber
    ) {

        return jointAccountRequestService
                .searchJointHolder(
                        accountNumber
                );

    }

    @GetMapping("/my-requests")
    public List<JointAccountMyRequestDto> getMyRequests(
            Principal principal) {

        return jointAccountRequestService
                .getMyRequests(principal);
    }

}
