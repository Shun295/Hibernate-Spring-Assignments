package com.bms.mapper;

import com.bms.dto.LoanMonitoringDto;
import com.bms.dto.LoanResDto;
import com.bms.dto.LoanResPageDto;
import com.bms.dto.OverdueLoanDto;
import com.bms.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class LoanMapper {
    public LoanResDto mapEntityToDto(Loan loan) {
    return new LoanResDto(
            loan.getId(),
            loan.getLoanStatus(),
            loan.getBalanceAmount(),
            loan.getStartDate(),
            loan.getEndDate(),
            loan.getLoanApplication().getId(),
            loan.getCreatedAt()
    );
    }

    public LoanResPageDto mapPageDto(Page<Loan> pages) {

        long totalRecords=pages.getTotalElements();
        int totalPages=pages.getTotalPages();
        List<LoanResDto> list=pages.getContent().stream().map(this::mapEntityToDto).toList();
        return new LoanResPageDto(totalPages,totalPages,list);
    }
    public LoanMonitoringDto mapEntityToMonitoringDto(Loan loan, String status
    ) {

        BigDecimal originalLoanAmount = loan.getLoanApplication().getPrincipalAmount();

        BigDecimal totalRepaidAmount = originalLoanAmount.subtract(loan.getBalanceAmount());

        Double repaymentPercentage = totalRepaidAmount.multiply(BigDecimal.valueOf(100))
                        .divide(originalLoanAmount, 2, RoundingMode.HALF_UP)
                        .doubleValue();

        return new LoanMonitoringDto(
                loan.getId(),
                loan.getLoanApplication()
                        .getCustomer()
                        .getFirstName()
                        + " " +
                        loan.getLoanApplication()
                                .getCustomer()
                                .getLastName(),
                originalLoanAmount,
                totalRepaidAmount,
                loan.getBalanceAmount(),
                loan.getLoanApplication().getEmiAmount(),
                repaymentPercentage,
                loan.getNextDueDate(),
                status
        );

    }

    public OverdueLoanDto mapToOverdueLoanDto(Loan loan, long daysOverdue
    ) {

        return new OverdueLoanDto(
                loan.getId(),

                loan.getLoanApplication()
                        .getCustomer() .getFirstName()
                        + " " +
                        loan.getLoanApplication()
                                .getCustomer()
                                .getLastName(),

                loan.getBalanceAmount(),
                loan.getLoanApplication()
                        .getEmiAmount(),
                loan.getNextDueDate(),
                daysOverdue

        );

    }
}
