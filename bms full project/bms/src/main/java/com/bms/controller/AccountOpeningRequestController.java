package com.bms.controller;

import com.bms.dto.*;
import com.bms.service.AccountOpeningRequestService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/accountOpeningReq")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountOpeningRequestController {

    private AccountOpeningRequestService accountOpeningRequestService;

    //customer request executive for account creation with required file
    @PostMapping("/apply")
    public void applyAccountOpening(Principal principal, @RequestParam int accountTypeId,
            @RequestParam("pan") MultipartFile pan,
            @RequestParam("aadhar") MultipartFile aadhar,
            @RequestParam("photo") MultipartFile photo) throws IOException {

        accountOpeningRequestService.applyAccountOpening(principal, accountTypeId, pan, aadhar, photo);
    }

    //customer getting their request-whatever they applied
    @GetMapping("/my-requests")
    public List<CustomerAccountOpeningResDto> getMyRequests(Principal principal) {

        return accountOpeningRequestService.getMyRequests(principal);
    }

    //get pending request -for the executive
    @GetMapping("/pending")
    public AccountOpeningResPageDto getPendingRequests(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return accountOpeningRequestService.getPendingRequests(page, size);
    }

    //reviewing the customer account req-by executive
    @PutMapping("/{requestId}/review")
    public void reviewRequest( @PathVariable int requestId,@RequestBody AccountOpeningReviewDto dto,Principal principal) {

        accountOpeningRequestService.reviewRequest(requestId, dto, principal);
    }

    //getting only the reviewed account opening req-admin
    @GetMapping("/reviewed")
    public AccountOpeningAdminResPageDto getReviewedRequests(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return accountOpeningRequestService.getReviewedRequests( page,size);
    }

    //admin approve via executive remarks
    @PutMapping("/{requestId}/approve")
    public void approveRequest(@PathVariable int requestId,Principal principal) {
        accountOpeningRequestService.approveRequest( requestId,principal);
    }

    //admin reject by analysing executive remarks
    @PutMapping("/{requestId}/reject")
    public void rejectRequest(@PathVariable int requestId,@RequestBody RejectRequestDto dto,Principal principal) {
        accountOpeningRequestService.rejectRequest(requestId,dto,principal);
    }

    @GetMapping("/{requestId}")
    public AccountOpeningExeResDto getRequestById(
            @PathVariable int requestId) {

        return accountOpeningRequestService.getRequestById(requestId);
    }

    @GetMapping("/{requestId}/admin")
    public AccountOpeningAdminResDto
    getRequestForAdmin(
            @PathVariable int requestId) {

        return accountOpeningRequestService
                .getRequestForAdmin(requestId);
    }



}
