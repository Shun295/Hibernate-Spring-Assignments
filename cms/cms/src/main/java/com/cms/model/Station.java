package com.cms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; //findById
    private String stationTitle;
    private String address;

    @ManyToOne
    private StationHead stationHead;
}