package com.cvc.repository;

import com.cvc.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface EmployerRepository extends JpaRepository<Employer,Integer> {
    Optional<Employer> findByUserUsername(String username);
}
