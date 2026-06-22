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
public class JointAccountRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(optional = false)
    private Account account;

    @ManyToOne(optional = false)
    private Customer requestedBy;

    @ManyToOne
    private Customer jointHolder;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String remarks;

    private String reason;
    private Instant reviewedAt;

    @ManyToOne
    private User reviewedBy;

    @CreationTimestamp
    private Instant createdAt;
}
