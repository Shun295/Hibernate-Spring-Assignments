package com.bms.repository;

import com.bms.model.Executive;
import com.bms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);

}
