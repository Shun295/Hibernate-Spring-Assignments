package com.bms.repository;

import com.bms.enums.AccountStatus;
import com.bms.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {
    Optional<Account> findById(int accountId);

    Optional<Account> findByAccountNumber(String accountNumber);

    Page<Account> findByBranchId(int branchId, Pageable pageable);

    Page<Account> findByAccountStatus(AccountStatus status, Pageable pageable);

    @Query("""
        select count(a)
        from Account a
        """)
    Long getTotalAccounts();
}
