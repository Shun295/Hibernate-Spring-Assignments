package com.cms.repository;

import com.cms.enums.IncidentType;
import com.cms.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident,Integer> {
    List<Incident> findByIncidentType(IncidentType incidentType);
    List<Incident> findByOfficerId(int officerId);

    List<Incident> findByOfficerUserUsername(String officerUsername);

    @Query("""
            select i
            from Incident i
            where i.officer.user.username=?1
            """)
    List<Incident> getByOfficerUserUsernameJpql(String officerUsername);
}
