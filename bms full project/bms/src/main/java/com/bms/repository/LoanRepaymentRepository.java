package com.bms.repository;

import com.bms.model.Customer;
import com.bms.model.LoanRepayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepaymentRepository extends JpaRepository<LoanRepayment,Integer> {
    Page<LoanRepayment> findByLoanLoanApplicationCustomer(Customer customer, Pageable pageable);

    Page<LoanRepayment> findByLoanId(int id, Pageable pageable);
}
