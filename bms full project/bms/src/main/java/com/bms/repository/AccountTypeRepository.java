package com.bms.repository;


import com.bms.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountTypeRepository extends JpaRepository<AccountType,Integer> {

    boolean existsByType(String type);
}
