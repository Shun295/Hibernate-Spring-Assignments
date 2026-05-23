package com.app.model;

import com.app.enums.LoanStatus;
import com.app.enums.LoanType;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private LoanType loanType;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private int tenure;

    @Column(nullable = false)
    private double interestRate;

    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Executive executive;

    public Loan() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LoanType getLoanType() {
        return loanType;
    }

    public void setLoanType(LoanType loanType) {
        this.loanType = loanType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public int getTenure() {
        return tenure;
    }

    public void setTenure(int tenure) {
        this.tenure = tenure;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public LoanStatus getStatus() {
        return status;
    }

    public void setStatus(LoanStatus status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Executive getExecutive() {
        return executive;
    }

    public void setExecutive(Executive executive) {
        this.executive = executive;
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", loanType=" + loanType +
                ", amount=" + amount +
                ", tenure=" + tenure +
                ", interestRate=" + interestRate +
                ", status=" + status +
                ", customer=" + customer +
                ", executive=" + executive +
                '}';
    }
}
