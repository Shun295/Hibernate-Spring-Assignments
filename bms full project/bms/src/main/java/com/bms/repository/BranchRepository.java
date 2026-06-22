package com.bms.repository;

import com.bms.enums.BranchStatus;
import com.bms.enums.Designation;
import com.bms.model.Branch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface BranchRepository extends JpaRepository<Branch,Integer> {

    Optional<Branch> findByIfscCode(String ifscCode);

    Page<Branch> findByStatus(BranchStatus branchStatus, Pageable pageable);

    long countByStatus(BranchStatus branchStatus);

    @Query("""
        select count(b)
        from Branch b
        """)
    Long getTotalBranches();
}
