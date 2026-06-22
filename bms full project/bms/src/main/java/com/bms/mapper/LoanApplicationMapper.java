package com.bms.mapper;

import com.bms.dto.*;
import com.bms.enums.LoanApplicationStatus;
import com.bms.enums.LoanStatus;
import com.bms.model.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class LoanApplicationMapper {
    public LoanApplication mapDtoToEntity(LoanApplicationReqDto dto, Customer customer, Account account, LoanTypeMaster loanType, BigDecimal emiAmount, BigDecimal totalRepayableAmount) {
        LoanApplication application = new LoanApplication();
        application.setPrincipalAmount(dto.principalAmount());
        application.setInterestRate(loanType.getInterestRate());
        application.setTermInMonth(dto.termInMonth());
        application.setEmiAmount(emiAmount);
        application.setTotalRepayableAmount(totalRepayableAmount);
        application.setStatus(LoanApplicationStatus.PENDING);
        application.setCustomer(customer);
        application.setAccount(account);
        application.setLoanTypeMaster(loanType);
        return application;
    }

    public LoanApplicationResDto mapEntityToDto(LoanApplication application) {
        return new LoanApplicationResDto(
                application.getId(),
                application.getLoanTypeMaster().getLoanType(),
                application.getPrincipalAmount(),
                application.getAnnualSalary(),
                application.getEligibleAmount(),
                application.getRemarks(),
                application.getInterestRate(),
                application.getTermInMonth(),
                application.getEmiAmount(),
                application.getTotalRepayableAmount(),
                application.getStatus().toString(),
                application.getCreatedAt()
        );
    }

    public LoanApplicationExeResDto mapEntityToExeDto(LoanApplication application) {
        BigDecimal recommendedEligibleAmount = application.getAnnualSalary().multiply(BigDecimal.valueOf(5));
        return new LoanApplicationExeResDto(
                application.getId(),
                application.getCustomer().getId(),
                application.getCustomer().getFirstName()
                        + " "
                        + application.getCustomer().getLastName(),
                application.getLoanTypeMaster()
                        .getLoanType(),
                application.getPrincipalAmount(),
                application.getAnnualSalary(),
                recommendedEligibleAmount,
                application.getInterestRate(),
                application.getTermInMonth(),
                application.getEmiAmount(),
                application.getTotalRepayableAmount(),
                application.getStatus().toString(),
                application.getCreatedAt()
        );
    }

    public LoanApplicationAdminResDto mapEntityToAdminDto(LoanApplication application) {
        return new LoanApplicationAdminResDto(
                application.getId(),
                application.getCustomer().getId(),
                application.getCustomer().getFirstName() + " " + application.getCustomer().getLastName(),
                application.getAccount().getId(),
                application.getAccount().getAccountNumber(),
                application.getLoanTypeMaster().getId(),
                application.getLoanTypeMaster().getLoanType(),
                application.getPrincipalAmount(),
                application.getInterestRate(),
                application.getTermInMonth(),
                application.getEmiAmount(),
                application.getTotalRepayableAmount(),
                application.getReviewedBy() != null
                        ? application.getReviewedBy().getEmployeeId()
                        : null,
                application.getReviewedBy() != null
                        ? application.getReviewedBy().getFirstName() + " "
                        + application.getReviewedBy().getLastName()
                        : null,
                application.getRemarks(),
                application.getReviewedAt(),
                application.getStatus().toString()
        );
    }

    public Loan mapLoanEntity(LoanApplication application) {
        Loan loan = new Loan();
        loan.setLoanStatus(LoanStatus.ACTIVE);
        loan.setBalanceAmount(application.getTotalRepayableAmount());
        loan.setStartDate(LocalDate.now());
        loan.setNextDueDate(LocalDate.now().plusMonths(1));
        loan.setEndDate(LocalDate.now().plusMonths(application.getTermInMonth()));
        loan.setLoanApplication(application);
        return loan;
    }

    public LoanApplicationCustomerDetailsDto mapEntityToCustomerDetailsDto(LoanApplication application)
    {
        return new LoanApplicationCustomerDetailsDto(
                application.getId(),
                application.getLoanTypeMaster()
                        .getLoanType(),
                application.getPrincipalAmount(),
                application.getAnnualSalary(),
                application.getEligibleAmount(),
                application.getRemarks(),
                application.getInterestRate(),
                application.getTermInMonth(),
                application.getEmiAmount(),
                application.getTotalRepayableAmount(),
                application.getStatus().toString()

        );
    }
}
