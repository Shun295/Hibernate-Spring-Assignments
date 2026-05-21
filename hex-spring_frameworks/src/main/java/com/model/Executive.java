package com.model;

import com.enums.Job_Title;
import jakarta.persistence.*;

@Entity
public class Executive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Job_Title jobTitle;

    @OneToOne
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Job_Title getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(Job_Title jobTitle) {
        this.jobTitle = jobTitle;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Executive{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", jobTitle=" + jobTitle +
                ", user=" + user +
                '}';
    }
}
