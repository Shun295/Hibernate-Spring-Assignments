package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.LoanStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.LoanMapper;
import com.bms.model.Customer;
import com.bms.model.Loan;
import com.bms.model.LoanRepayment;
import com.bms.model.User;
import com.bms.repository.CustomerRepository;
import com.bms.repository.LoanRepaymentRepository;
import com.bms.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanService {

    private LoanRepository loanRepository;
    private LoanMapper loanMapper;
    private UserService userService;
    private CustomerRepository customerRepository;
    private final LoanRepaymentRepository loanRepaymentRepository;

    public LoanResDto getLoanById(int loanId) {
    Loan loan=loanRepository.findById(loanId)
            .orElseThrow(()->new ResourceNotFoundException("loan not found"));
    return loanMapper.mapEntityToDto(loan);
    }

    public LoanResPageDto getAllLoans(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
        Page<Loan> pages=loanRepository.findAll(pageable);
        return loanMapper.mapPageDto(pages);
    }

    public LoanResPageDto getMyLoans(Principal principal,int page,int size) {

        String username = principal.getName();

        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 2: Repository
        Page<Loan> pages = loanRepository.findByLoanApplicationCustomer(customer, pageable);

        // Step 3: Get Content
        List<Loan> list = pages.getContent();

        // Step 4: Convert Entity to DTO
        List<LoanResDto> data = list.stream().map(loanMapper::mapEntityToDto).toList();

        // Step 5: Return Page DTO
        return new LoanResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }


    public LoanResPageDto getLoanByAccount(int accountId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Loan> pages = loanRepository.findByLoanApplicationAccountId(accountId, pageable);
        List<Loan> list = pages.getContent();
        List<LoanResDto> data = list.stream()
                        .map(loanMapper::mapEntityToDto)
                        .toList();

        return new LoanResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public LoanResPageDto getLoansByStatus(LoanStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Loan> pages = loanRepository.findByLoanStatus(status, pageable);
        List<Loan> list = pages.getContent();

        List<LoanResDto> data = list.stream()
                        .map(loanMapper::mapEntityToDto)
                        .toList();
        return new LoanResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public void completeLoan(int loanId) {

        Loan loan = loanRepository.findById(loanId)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if (loan.getLoanStatus() != LoanStatus.ACTIVE) {
            throw new IllegalStateException("Only active loans can be completed");
        }

        if (loan.getBalanceAmount().compareTo(BigDecimal.ZERO) > 0) {
            throw new IllegalStateException("Loan still has outstanding balance");
        }

        loan.setLoanStatus(LoanStatus.COMPLETED);
        loanRepository.save(loan);
    }

    public void closeLoan(int loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if(loan.getLoanStatus() != LoanStatus.COMPLETED) {
            throw new ResourceNotFoundException("Only completed loans can be closed");
        }
        loan.setLoanStatus(LoanStatus.CLOSED);
        loanRepository.save(loan);
    }

    public void defaultLoan(int loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if(loan.getLoanStatus() != LoanStatus.ACTIVE) {
            throw new ResourceNotFoundException("Only active loans can be defaulted");
        }
        loan.setLoanStatus(LoanStatus.DEFAULTED);
        loanRepository.save(loan);
    }
    public LoanMonitoringDto getLoanMonitoringById(int loanId
    ) {

        Loan loan = loanRepository.findById(loanId)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
//20-06-2026 isAfter 15-06-2026-true overdue,20-06-2026 isAfter 25-06-2026-false(ontime)
        String status = LocalDate.now().isAfter(loan.getNextDueDate()) ? "OVERDUE" : "ON_TIME";
        return loanMapper.mapEntityToMonitoringDto(loan, status);
    }

    public List<LoanMonitoringDto> getLoanMonitoring() {

        return loanRepository.findAll()
                .stream()
                .map(loan -> {
                    String status = LocalDate.now().isAfter(loan.getNextDueDate())
                                    ? "OVERDUE" : "ON_TIME";
                    return loanMapper.mapEntityToMonitoringDto(loan, status);}).toList();
    }


    public LoanDashboardDto getDashboard() {

        long activeLoans = loanRepository.findAll()
                        .stream()
                        .filter(loan -> loan.getLoanStatus() == LoanStatus.ACTIVE)
                        .count();

        long totalRepayments = loanRepaymentRepository.count();

        //
        BigDecimal totalCollection = loanRepaymentRepository.findAll()
                        .stream()
                        //extract only repayment amount
                        .map(LoanRepayment::getRepaymentAmount)
                       //add all amount together starts with 0
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        long overdueLoans = loanRepository.findAll()
                        .stream()
                //checking if loan due date is before today and active
                        .filter(
                                loan -> loan.getNextDueDate().isBefore(LocalDate.now())
                                                && loan.getLoanStatus() == LoanStatus.ACTIVE
                        )
                        .count();
        return new LoanDashboardDto(
                activeLoans,
                totalRepayments,
                totalCollection,
                overdueLoans
        );

    }
    public List<OverdueLoanDto> getOverdueLoans() {

        List<Loan> loans = loanRepository.findAll();
        return loans.stream()
                // Filter loans whose next due date has already passed
                .filter(loan -> LocalDate.now().isAfter(loan.getNextDueDate()))
                // Convert each overdue loan into OverdueLoanDto
                .map(loan -> {
                    // Calculate the number of days the loan is overdue
                    //Next Due Date = 10-06-2026
                    //Today         = 20-06-2026(20 - 10 = 10)
                            long daysOverdue = ChronoUnit.DAYS.between(
                                            loan.getNextDueDate(),
                                            LocalDate.now());
                    // Map Loan entity and overdue days to DTO
                            return loanMapper.mapToOverdueLoanDto(loan, daysOverdue);
                        }
                )
                .toList();
    }

    public void sendReminder(int loanId){
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        loan.setReminderSent(true);

        loanRepository.save(loan);
    }

}
