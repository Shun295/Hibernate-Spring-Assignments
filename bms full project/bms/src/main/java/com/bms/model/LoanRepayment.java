package com.bms.model;

import com.bms.enums.PaymentMode;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "loan_repayment")
public class LoanRepayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "repayment_amount", nullable = false)
    private BigDecimal repaymentAmount;

    @Column(name = "repayment_date", nullable = false)
    private LocalDate repaymentDate;

    @Column(name = "transaction_reference", unique = true)
    private String transactionReference;

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @ManyToOne(optional = false)
    private Loan loan;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
}
