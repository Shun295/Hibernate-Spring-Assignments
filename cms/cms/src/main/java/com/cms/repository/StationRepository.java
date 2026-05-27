package com.cms.repository;

import com.cms.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station,Integer>
{
    /*@Query("""
            select s from Incident i
            join i.officer o
            join o.station s
            where i.id=?1
            """)
    Station getStationByIncidentId(int incidentId);*/
}
