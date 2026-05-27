package com.cms.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name = "employee_project")
@Getter
@Setter

public class EmployeeProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Project project;

    @Column(nullable = false)
    private LocalDate allotedDate;

    @Column(length = 500)
    private String roleDetails;

    @Column(nullable = false)
    private String duration;


}
