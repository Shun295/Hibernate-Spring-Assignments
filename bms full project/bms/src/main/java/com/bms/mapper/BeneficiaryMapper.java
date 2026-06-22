package com.bms.mapper;

import com.bms.dto.BeneficiaryReqDto;
import com.bms.dto.BeneficiaryResDto;
import com.bms.model.Beneficiary;
import org.springframework.stereotype.Component;

@Component
public class BeneficiaryMapper {

    public Beneficiary toEntity(BeneficiaryReqDto dto) {

        Beneficiary beneficiary = new Beneficiary();

        beneficiary.setName(dto.name());
        beneficiary.setAccountNumber(dto.accountNumber());
        beneficiary.setIfscCode(dto.ifscCode());
        beneficiary.setDescription(dto.description());

        return beneficiary;
    }

    public BeneficiaryResDto toBeneficiaryResDto(Beneficiary beneficiary) {

        return new BeneficiaryResDto(
                beneficiary.getId(),
                beneficiary.getName(),
                beneficiary.getAccountNumber(),
                beneficiary.getIfscCode(),
                beneficiary.getBeneficiaryStatus()
        );
    }
}

