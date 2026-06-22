package com.bms.model;

import com.bms.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
@Entity
@Getter
@Setter
@Table(name = "account_closure_request")
public class AccountClosureRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus reqStatus;

    @ManyToOne(optional = false)
    private Account account;

    @ManyToOne(optional = false)
    private Customer customer;

    @ManyToOne
    private User reviewedBy;

    private Instant reviewedAt;

    private String remarks;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}
