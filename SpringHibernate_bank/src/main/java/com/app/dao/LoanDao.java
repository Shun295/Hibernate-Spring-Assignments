package com.app.dao;

import com.app.model.Loan;

import java.util.List;

public interface LoanDao {
    List<Loan> findAllLoan(String customerUsername);
    void applyLoan(Loan loan,String customerUsername);
    Loan getById(int loanId, String username);
    void update(Loan loan);
    void deleteLoan(int loanId, String username);
}
