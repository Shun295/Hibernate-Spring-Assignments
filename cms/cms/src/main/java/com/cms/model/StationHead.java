package com.cms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StationHead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //findById

    @Column(nullable = false)
    private String name;

    @OneToOne
    private User user;
}