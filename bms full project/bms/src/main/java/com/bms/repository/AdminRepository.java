package com.bms.repository;

import com.bms.model.Admin;
import com.bms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Optional<Admin> findByUser(User user);
}
