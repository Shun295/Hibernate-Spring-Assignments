package com.bms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class LoanTypeMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String loanType;
    private BigDecimal interestRate;
    private int maxTermMonths;
    private BigDecimal maxLoanAmount;
}

