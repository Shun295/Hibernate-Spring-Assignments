package com.cms.repository;

import com.cms.model.Suspect;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuspectRepository extends JpaRepository<Suspect,Integer> {
}
