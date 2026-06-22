package com.bms.mapper;

import com.bms.dto.LoanTypeReqDto;
import com.bms.model.LoanTypeMaster;
import org.springframework.stereotype.Component;

@Component
public class LoanTypeMapper {


    public static LoanTypeMaster mapDtoToEntity(LoanTypeReqDto dto) {
        LoanTypeMaster loanType = new LoanTypeMaster();

        loanType.setLoanType(dto.loanType());
        loanType.setInterestRate(dto.interestRate());
        loanType.setMaxTermMonths(dto.maxTermMonths());
        loanType.setMaxLoanAmount(dto.maxLoanAmount());

        return loanType;
    }
}
