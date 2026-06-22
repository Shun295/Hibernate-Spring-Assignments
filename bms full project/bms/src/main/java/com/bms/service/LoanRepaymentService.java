package com.bms.service;

import com.bms.dto.LoanRepaymentReqDto;
import com.bms.dto.LoanRepaymentResDto;
import com.bms.dto.LoanRepaymentResPageDto;
import com.bms.dto.LoanSummaryDto;
import com.bms.enums.LoanStatus;
import com.bms.exception.AccessDeniedException;
import com.bms.exception.InvalidAmountException;
import com.bms.exception.NotActiveException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.LoanRepaymentMapper;
import com.bms.model.Customer;
import com.bms.model.Loan;
import com.bms.model.LoanRepayment;
import com.bms.repository.CustomerRepository;
import com.bms.repository.LoanRepaymentRepository;

import com.bms.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanRepaymentService {

    private LoanRepaymentRepository loanRepaymentRepository;
    private LoanRepository loanRepository;
    private LoanRepaymentMapper loanRepaymentMapper;
    private CustomerRepository customerRepository;
    @Transactional
    public void repayLoan(LoanRepaymentReqDto dto, Principal principal
    ) {
        String username = principal.getName();

        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Loan loan = loanRepository.findById(dto.loanId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if (loan.getLoanApplication().getCustomer().getId() != customer.getId()) {
            throw new AccessDeniedException("You are not allowed to repay this loan");
        }

        if (loan.getLoanStatus() != LoanStatus.ACTIVE) {
            throw new NotActiveException("Repayment allowed only for active loans");
        }

        //1  -> Repayment Amount > 0
        //0  -> Repayment Amount = 0
        //-1 -> Repayment Amount < 0
        if (dto.repaymentAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidAmountException("Invalid repayment amount");
        }

        if (dto.repaymentAmount().compareTo(loan.getBalanceAmount()) > 0) {

            throw new InvalidAmountException("Repayment exceeds balance amount");
        }

        LoanRepayment repayment = loanRepaymentMapper.mapDtoToEntity(dto, loan);

        loan.setBalanceAmount(loan.getBalanceAmount().subtract(dto.repaymentAmount()));

        //initially if it is 0 then +1 month
        if (loan.getNextDueDate() == null) {
            loan.setNextDueDate(LocalDate.now().plusMonths(1));
        } else {
            loan.setNextDueDate(
                    loan.getNextDueDate().plusMonths(1)
            );
        }

        //if balance=0 and bigdecimal.zero=0  0==0
        if (loan.getBalanceAmount().compareTo(BigDecimal.ZERO) == 0) {
            loan.setLoanStatus(LoanStatus.CLOSED);
        }

        loanRepository.save(loan);
        loanRepaymentRepository.save(repayment);
    }
    public LoanRepaymentResPageDto getMyRepayments(Principal principal,int page,int size) {

        String username = principal.getName();

        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 2: Repository
        Page<LoanRepayment> pages = loanRepaymentRepository.findByLoanLoanApplicationCustomer(customer, pageable);

        // Step 3: Get Content
        List<LoanRepayment> list = pages.getContent();

        // Step 4: Convert Entity to DTO
        List<LoanRepaymentResDto> data =
                list.stream()
                        .map(loanRepaymentMapper::mapEntityToDto)
                        .toList();

        // Step 5: Return Page DTO
        return new LoanRepaymentResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );

    }

    public LoanRepaymentResPageDto getAllRepayments(int page, int size) {

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 2: Repository
        Page<LoanRepayment> pages = loanRepaymentRepository.findAll(pageable);

        // Step 3: Get Content
        List<LoanRepayment> list = pages.getContent();

        // Step 4: Convert Entity to DTO
        List<LoanRepaymentResDto> data = list.stream()
                        .map(loanRepaymentMapper::mapEntityToDto)
                        .toList();

        // Step 5: Return Page DTO
        return new LoanRepaymentResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public LoanRepaymentResPageDto getRepaymentsByLoan(int loanId, int page, int size) {

        // Step 1: Validate Loan
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        // Step 2: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 3: Repository
        Page<LoanRepayment> pages = loanRepaymentRepository.findByLoanId(loan.getId(), pageable);

        // Step 4: Get Content
        List<LoanRepayment> list = pages.getContent();

        // Step 5: Convert Entity to DTO
        List<LoanRepaymentResDto> data =
                list.stream()
                        .map(loanRepaymentMapper::mapEntityToDto)
                        .toList();

        // Step 6: Return Page DTO
        return new LoanRepaymentResPageDto(pages.getTotalElements(), pages.getTotalPages(), data
        );
    }

    public LoanSummaryDto getLoanSummary(int loanId, Principal principal
    ) {

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() ->
                        new RuntimeException("Loan not found"));
        return new LoanSummaryDto(
                loan.getId(),
                loan.getBalanceAmount(),
                loan.getLoanApplication().getEmiAmount(),
                loan.getNextDueDate()

        );
    }

}
