package com.bms.model;

import com.bms.enums.LoanApplicationStatus;
import com.bms.model.LoanTypeMaster;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "loan_application")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private BigDecimal principalAmount;

    @Column( nullable = false)
    private BigDecimal interestRate;

    @Column( nullable = false)
    private int termInMonth;

    @Column(nullable = false)
    private BigDecimal totalRepayableAmount;

    @Column(nullable = false)
    private BigDecimal emiAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanApplicationStatus status;

    private Instant reviewedAt;

    private String remarks;

    @ManyToOne
    private Account account;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private LoanTypeMaster loanTypeMaster;

    @Column(nullable = false)
    private BigDecimal annualSalary;

    @Column
    private BigDecimal eligibleAmount;

    @ManyToOne
    private Executive reviewedBy;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}

