package com.bms.controller;

import com.bms.dto.LoanRepaymentReqDto;
import com.bms.dto.LoanRepaymentResPageDto;
import com.bms.dto.LoanSummaryDto;
import com.bms.service.LoanRepaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.security.PrivateKey;

@RestController
@RequestMapping("/api/repayment")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanRepaymentController {

    private LoanRepaymentService loanRepaymentService;

    @PostMapping("/pay")
    public void repayLoan(
            @Valid @RequestBody LoanRepaymentReqDto dto,
            Principal principal
    ) {
        loanRepaymentService.repayLoan(dto, principal);
    }
    @GetMapping("/my-repayments")
    public LoanRepaymentResPageDto getMyRepayments(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return loanRepaymentService.getMyRepayments(principal, page, size);
    }

    @GetMapping("/all")
    public LoanRepaymentResPageDto getAllRepayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return loanRepaymentService.getAllRepayments(page,size);
    }

    @GetMapping("/loan/{loanId}")
    public LoanRepaymentResPageDto getRepaymentsByLoan(
            @PathVariable int loanId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return loanRepaymentService.getRepaymentsByLoan( loanId,page,size);
    }

    @GetMapping("/summary/{loanId}")
    public LoanSummaryDto getLoanSummary(
            @PathVariable int loanId,
            Principal principal
    ) {

        return loanRepaymentService
                .getLoanSummary(
                        loanId,
                        principal
                );
    }
}
