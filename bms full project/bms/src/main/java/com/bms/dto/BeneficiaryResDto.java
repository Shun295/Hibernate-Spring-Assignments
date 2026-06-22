package com.bms.dto;

import com.bms.enums.BeneficiaryStatus;

public record BeneficiaryResDto(
        int id,
        String name,
        String accountNumber,
        String ifscCode,
        BeneficiaryStatus beneficiaryStatus
) {
}
