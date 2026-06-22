package com.bms.repository;

import com.bms.model.Customer;
import com.bms.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    Optional<Customer> findByUserUsername(String username);
    Optional<Customer> findByEmail(String email);


    Optional<Customer> getByUserUsername(String username);

    @Query("""
        select count(c)
        from Customer c
        """)
    Long getTotalCustomers();


    Optional<Customer> findByUser(User user);

    @Query("""
        SELECT DISTINCT c
        FROM Customer c
        JOIN CustomerAccount ca
            ON ca.customer.id = c.id
        JOIN Account a
            ON ca.account.id = a.id
        WHERE a.branch.id = :branchId
       """)
    List<Customer> getCustomersByBranch(
            @Param("branchId")
            int branchId
    );


    @Query("""
select
month(c.createdAt),
count(c)
from Customer c
group by month(c.createdAt)
order by month(c.createdAt)
""")
    List<Object[]> getCustomerGrowth();
}
