package com.bms.repository;

import com.bms.enums.LoanStatus;
import com.bms.model.Customer;
import com.bms.model.Loan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<Loan,Integer> {
    Page<Loan> findByLoanApplicationAccountId(int accountId, Pageable pageable);

    Page<Loan> findByLoanStatus(LoanStatus status, Pageable pageable);

    Page<Loan> findByLoanApplicationCustomer(Customer customer, Pageable pageable);

    @Query("""
        select count(l)
        from Loan l
        """)
    Long getTotalLoans();



    long countByLoanApplication_Customer_IdAndLoanStatus(int id, LoanStatus loanStatus);

    boolean existsByLoanApplication_Customer_IdAndReminderSentTrue(int id);
}
