package com.bms.controller;

import com.bms.dto.*;
import com.bms.enums.LoanStatus;
import com.bms.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/loan")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanController {

    private LoanService loanService;

    //GET THE LOAN BY ID -ACCESS GIVES TO EXECUTABLE AND ADMIN
    @GetMapping("/{loanId}")
    public LoanResDto getLoanById(@PathVariable int loanId) {
        return loanService.getLoanById(loanId);
    }

    //GET ALL LOANS (ADMIN-ONLY ACCESS)
    @GetMapping("/all")
    public LoanResPageDto getAllLoans(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return loanService.getAllLoans(page, size);
    }

    //GET MY LOANS-WHICH MEANS THE CUSTOMER CREATED LOANS
    @GetMapping("my-loans")
    public LoanResPageDto getMyLoans(Principal principal,@RequestParam(defaultValue ="0")int page,@RequestParam(defaultValue = "10") int size)
    {
        return loanService.getMyLoans(principal,page,size);
    }

    //SHOWING ALL THE LOANS ASSOCIATED  WITH PARTICULAR ACCOUNT
    @GetMapping("/account/{accountId}")
    public LoanResPageDto getLoanByAccount(@PathVariable int accountId,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size)
    {
        return loanService.getLoanByAccount(accountId,page,size);
    }

    //SHOWING LOANS BASED ON THE STATUS
    @GetMapping("/status/{status}")
    public LoanResPageDto getLoansByStatus(@PathVariable LoanStatus status,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size)
    {
        return loanService.getLoansByStatus(status,page,size);
    }

    //only actie loans can be complted
    @PutMapping("/{loanId}/complete")
    public void completeLoan(@PathVariable int loanId) {
        loanService.completeLoan(loanId);
    }

    //completed loans only will get closed
    @PutMapping("/{loanId}/close")
    public void closeLoan(@PathVariable int loanId) {
        loanService.closeLoan(loanId);
    }

    //only active loasn get can defaulted
    @PutMapping("/{loanId}/default")
    public void defaultLoan(@PathVariable int loanId) {
        loanService.defaultLoan(loanId);
    }

    @GetMapping("/monitoring")
    public List<LoanMonitoringDto>
    getLoanMonitoring() {

        return loanService
                .getLoanMonitoring();
    }

    @GetMapping("/monitoring/{loanId}")
    public LoanMonitoringDto getLoanMonitoringById(
            @PathVariable int loanId
    ) {

        return loanService
                .getLoanMonitoringById(
                        loanId
                );

    }
    @GetMapping("/dashboard")
    public LoanDashboardDto getDashboard() {

        return loanService.getDashboard();

    }
    @GetMapping("/overdue")
    public List<OverdueLoanDto> getOverdueLoans() {

        return loanService.getOverdueLoans();

    }

    @PutMapping("/admin/send-reminder/{loanId}")
    public String sendReminder(@PathVariable int loanId){
        loanService.sendReminder(loanId);
        return "Reminder Sent";
    }


}
