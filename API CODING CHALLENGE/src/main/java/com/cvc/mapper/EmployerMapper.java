package com.cvc.mapper;

import com.cvc.dto.EmployerSignInReqDto;

import com.cvc.model.Employer;
import org.springframework.stereotype.Component;

@Component
public class EmployerMapper {
    public Employer mapDtoToEntity(EmployerSignInReqDto signInReqDto) {
        Employer employer=new Employer();
        employer.setCompanyName(signInReqDto.companyName());
        return employer;
    }
}
