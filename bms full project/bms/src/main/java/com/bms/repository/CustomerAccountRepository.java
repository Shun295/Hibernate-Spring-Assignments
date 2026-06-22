package com.bms.repository;

import com.bms.enums.OwnershipStatus;
import com.bms.model.Account;
import com.bms.model.AccountType;
import com.bms.model.Customer;
import com.bms.model.CustomerAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount,Integer> {
    Page<CustomerAccount> findByCustomer(
            Customer customer,
            Pageable pageable
    );

    Optional<CustomerAccount>
    findByAccountId(
            int accountId
    );

    List<CustomerAccount> findByCustomerId(
            int customerId
    );
    Page<CustomerAccount> findByCustomerId(int customerId, Pageable pageable);

    @Query("""
       SELECT COUNT(ca) > 0
       FROM CustomerAccount ca
       WHERE ca.customer = :customer
       AND ca.account.accountType = :accountType
       """)
    boolean existsByCustomerAndAccountType(
            @Param("customer") Customer customer,
            @Param("accountType") AccountType accountType
    );


    boolean existsByCustomerIdAndAccountId(int id, int accountId);

    Optional<CustomerAccount> findByAccountIdAndCustomerId(int accountId, int customerId);

    boolean existsByCustomerAndAccount(Customer customer, Account account);

    List<CustomerAccount> findByAccountIdAndOwnershipStatus(int accountId, OwnershipStatus ownershipStatus);

    Optional<CustomerAccount> findByCustomerIdAndAccountId(int id, int i);

    List<CustomerAccount>
    findByCustomerAndPrimaryHolderTrue(
            Customer customer
    );
}
