package com.bms.controller;

import com.bms.dto.*;
import com.bms.service.LoanApplicationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/loan-application")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanApplicationController {
    private final LoanApplicationService loanApplicationService;

    @PostMapping("/apply")
    public void applyLoan(@Valid @RequestBody LoanApplicationReqDto dto, Principal principal) {
        loanApplicationService.applyLoan(dto, principal);
    }

    @GetMapping("/my-applications")
    public LoanApplicationResPageDto getMyApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Principal principal) {

        return loanApplicationService.getMyApplications(page, size, principal);
    }

    @GetMapping("/pending")
    public LoanApplicationExeResPageDto getPendingApplications(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {

        return loanApplicationService.getPendingApplications(page, size);
    }

    @PutMapping("/{applicationId}/review")
    public void reviewApplication(
            @PathVariable int applicationId,
            @Valid @RequestBody LoanApplicationReviewDto dto,
            Principal principal) {

        loanApplicationService.reviewApplication(applicationId,dto,principal);
    }


    @GetMapping("/reviewed")
    public LoanApplicationAdminResPageDto getReviewedApplications(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return loanApplicationService.getReviewedApplications(
                        page,
                        size);
    }

    @PutMapping("/{applicationId}/approve")
    public void approveApplication(@PathVariable int applicationId) {

        loanApplicationService.approveApplication(applicationId);
    }

    @PutMapping("/{applicationId}/reject")
    public void rejectApplication(
            @PathVariable int applicationId,
            @RequestBody LoanApplicationRejectDto dto) {

        loanApplicationService.rejectApplication(
                        applicationId,
                        dto);
    }

    @GetMapping("/{applicationId}")
    public LoanApplicationExeResDto getApplicationById(
            @PathVariable int applicationId) {

        return loanApplicationService
                .getApplicationById(applicationId);
    }

    @GetMapping("/{applicationId}/admin")
    public LoanApplicationAdminResDto getApplicationForAdmin(
            @PathVariable int applicationId) {

        return loanApplicationService
                .getApplicationForAdmin(
                        applicationId
                );
    }

    @PutMapping("/customer/resubmit/{applicationId}")
    public void resubmitLoanApplication(
            @PathVariable int applicationId,
            @Valid @RequestBody LoanApplicationResubmitDto dto,
            Principal principal
    ) {
        loanApplicationService
                .resubmitLoanApplication(
                        applicationId,
                        dto,
                        principal
                );
    }

    @GetMapping("/customer/{applicationId}")
    public LoanApplicationCustomerDetailsDto
    getCustomerApplicationById(
            @PathVariable int applicationId,
            Principal principal
    ) {

        return loanApplicationService
                .getCustomerApplicationById(
                        applicationId,
                        principal
                );
    }

}
