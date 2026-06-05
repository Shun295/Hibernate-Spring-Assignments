package com.cvc.repository;

import com.cvc.model.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SeekerRepository extends JpaRepository<Seeker,Integer> {
   Optional<Seeker> findByUserUsername(String username);
}
