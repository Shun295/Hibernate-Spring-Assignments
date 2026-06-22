package com.bms.mapper;

import com.bms.dto.LoanRepaymentReqDto;
import com.bms.dto.LoanRepaymentResDto;
import com.bms.model.Loan;
import com.bms.model.LoanRepayment;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

@Component
public class LoanRepaymentMapper {
    public LoanRepayment mapDtoToEntity(LoanRepaymentReqDto dto, Loan loan) {

        LoanRepayment repayment = new LoanRepayment();

        repayment.setLoan(loan);

        repayment.setRepaymentAmount(dto.repaymentAmount());

        repayment.setRepaymentDate(LocalDate.now());

        repayment.setPaymentMode(dto.paymentMode());

        repayment.setTransactionReference(UUID.randomUUID().toString());
        return repayment;
    }

    public LoanRepaymentResDto mapEntityToDto(
            LoanRepayment repayment) {

        return new LoanRepaymentResDto(

                repayment.getId(),

                repayment.getLoan().getId(),

                repayment.getRepaymentAmount(),

                repayment.getRepaymentDate(),

                repayment.getTransactionReference(),

                repayment.getPaymentMode(),

                repayment.getCreatedAt()
        );
    }
}
