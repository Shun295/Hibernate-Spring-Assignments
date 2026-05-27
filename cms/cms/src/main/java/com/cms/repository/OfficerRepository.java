package com.cms.repository;

import com.cms.model.Officer;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface OfficerRepository extends JpaRepository<Officer,Integer> {

    Officer findByUserUsername(String officerUsername);
    List<Officer> findByStationStationHeadUserUsername(String stationHeadUsername);

    List<Officer> findByStationStationTitle(String stationTitle);

    /*@Query("""
            select o from Officer o
            join Incident i ON o.id=i.officer.id
            where i.id = ?1
            """) // since we wanted to go backwards from Officer to Incident, we used join
    Officer getByIncidentId(int incidentId);*/
}
