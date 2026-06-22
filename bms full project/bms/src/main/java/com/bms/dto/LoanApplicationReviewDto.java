package com.bms.dto;

import com.bms.enums.LoanApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LoanApplicationReviewDto(

        @NotBlank(message = "Enter remarks")
        String remarks,

        BigDecimal eligibleAmount,

        @NotNull(message = "Select status")
        LoanApplicationStatus status

) {
}
