package com.bms.repository;

import com.bms.model.Beneficiary;
import com.bms.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary,Integer> {
    boolean existsByCustomerAndAccountNumber(Customer customer, String s);

    List<Beneficiary> findByCustomer(Customer customer);

    Optional<Beneficiary> findByIdAndCustomer(int i, Customer customer);

    long countByCustomerId(int id);
}
