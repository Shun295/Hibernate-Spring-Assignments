package com.bms.repository;

import com.bms.enums.LoanApplicationStatus;
import com.bms.model.Customer;
import com.bms.model.LoanApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication,Integer> {
    Page<LoanApplication> findByCustomer(Customer customer, Pageable pageable);

    Page<LoanApplication> findByStatus(LoanApplicationStatus loanApplicationStatus, Pageable pageable);

    Long countByStatus(LoanApplicationStatus requestStatus);
}
