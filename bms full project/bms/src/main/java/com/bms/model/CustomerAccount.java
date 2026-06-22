package com.bms.model;

import com.bms.enums.OwnershipStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class CustomerAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Account account;

    @Column(nullable = false)
    private boolean primaryHolder;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OwnershipStatus ownershipStatus;
}
