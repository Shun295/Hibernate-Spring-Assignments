package com.bms.controller;

import com.bms.dto.*;
import com.bms.enums.RequestStatus;
import com.bms.service.AccountClosureRequestService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/accountClosure")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountClosureRequestController {

    private AccountClosureRequestService accountClosureRequestService;

    //CREATE A NEW ACCOUNT CLOSURE-CUSTOMER
    @PostMapping("/customer/request")
    public void requestAccClose(@Valid @RequestBody AccountClosureReqDto dto, Principal principal)
    {
        accountClosureRequestService.requestAccClose(dto,principal);
    }

    //GET ACCOUNT REQ BY ID-FOR ADMIN AND EXECUTIVE
    @GetMapping("{requestId}")
    public AccountClosureResDto getRequestById(@PathVariable int requestId)
    {
        return accountClosureRequestService.getRequestById(requestId);
    }


    //PAGINATION FOR GETALL-ADMIN,EXECUTIVE
    @GetMapping("/all")
    public AccountClosureResPageDto getAllClosureRequest(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return accountClosureRequestService.getAllClosureRequest(page, size);
    }

    //GET MY REQ BY CUSTOMER
    @GetMapping("/my-request")
    public List<CustomerAccountClosureResDto> getMyRequests(Principal principal)
    {
        return accountClosureRequestService.getMyRequests(principal);
    }

    //GET PENDING ACC-ADMIN EXECUTIVE
    @GetMapping("/pending")
    public AccountPageDto getPendingReq(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return accountClosureRequestService.getPendingReq(page, size);
    }

//    //APPROVE ACC CLOSURE-ADMIN
//    @PutMapping("/{requestId}/approve")
//    public void approveRequest(@PathVariable int requestId,Principal principal)
//    {
//        accountClosureRequestService.approveRequest(requestId,principal);
//    }

//    //REJECT REQUEST-ADMIN
//    @PutMapping("{requestId}/reject")
//    public void rejectRequest(@PathVariable int requestId,@RequestParam String remarks, Principal principal)
//    {
//        accountClosureRequestService.rejectRequest(requestId,remarks,principal);
//    }

//    //CANCEL REQUEST-CUSTOMER
//    @PutMapping("/{requestId}/cancel")
//    public void cancelRequest(@PathVariable int requestId,Principal principal)
//    {
//        accountClosureRequestService.cancelRequest(requestId,principal);
//    }

    //REVIEW REQ-EXECUTIVE
    @PutMapping("/{requestId}/review")
    public void reviewRequest(@PathVariable int requestId, @RequestBody ReviewRequestDto dto, Principal principal) {

        accountClosureRequestService.reviewRequest(requestId,dto,principal);
    }

    //GET REVIEWED REQ-ADMIN
    @GetMapping("/reviewed")
    public AccountClosureResPageDto getReviewedRequests(@RequestParam int page, @RequestParam int size) {

        return accountClosureRequestService.getReviewedRequests(page, size);
    }

    @GetMapping("/admin/dashboard")
    public ClosureDashboardDto getClosureDashboardStats() {

        return accountClosureRequestService.getClosureDashboardStats();
    }

//-a-admin
    @PutMapping("/admin/{requestId}/decision")
    public void reviewByAdmin(@PathVariable int requestId, @RequestBody AdminReviewRequestDto dto, Principal principal)
    {
        accountClosureRequestService.reviewByAdmin(requestId, dto, principal
        );

    }

    //admin
    @GetMapping("/admin/status")
    public List<AccountClosureResDto> getByStatus(
            @RequestParam RequestStatus status
    ) {
        return accountClosureRequestService.getByStatus(status);
    }
    @GetMapping("/admin/search")
    public List<AccountClosureResDto> searchClosureRequest(@RequestParam String keyword
    ) {
        return accountClosureRequestService.searchClosureRequest(keyword);
    }
//exe
    @GetMapping("/search")
    public AccountClosureRespoDto searchByRequestId(@RequestParam int requestId
    )
    {
        return accountClosureRequestService.searchByRequestId(requestId);
    }

    @GetMapping("/filter")
    public List<AccountClosureRespoDto> filterByAccountType(@RequestParam String accountType
    ) {
        return accountClosureRequestService.filterByAccountType(accountType);
    }
}

