package com.bms.model;

import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String referenceNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus transactionStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EntryType entryType;

    @ManyToOne(optional = false)
    private Account account;

    @ManyToOne
    private Account beneficiaryAccount;

    @Column(nullable = false)
    private BigDecimal amount;

    private String beneficiaryName;

    private String beneficiaryAccountNumber;

    private String description;

    @Column(nullable = false)
    private BigDecimal balanceAfterTxn;

    @CreationTimestamp
    @Column(name = "transaction_date", updatable = false)
    private Instant transactionDate;
}
