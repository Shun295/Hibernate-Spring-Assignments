package com.bms.repository;

import com.bms.model.LoanTypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanTypeMaster,Integer> {
    boolean existsByLoanType(String s);
}
