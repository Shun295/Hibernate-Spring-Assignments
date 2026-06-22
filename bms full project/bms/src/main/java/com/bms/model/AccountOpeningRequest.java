package com.bms.model;

import com.bms.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class AccountOpeningRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String remarks;

    private Instant reviewedAt;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private AccountType accountType;

    @ManyToOne
    private Branch branch;

    private String panDocument;

    private String aadharDocument;

    private String photoDocument;

    @ManyToOne
    private User reviewedBy;

    @CreationTimestamp
    private Instant createdAt;
}


