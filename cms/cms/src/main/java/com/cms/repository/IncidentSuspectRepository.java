package com.cms.repository;

import com.cms.dto.IncidentSuspectResponseDto;
import com.cms.dto.SuspectResponseDto;
import com.cms.model.IncidentSuspect;
import com.cms.model.Suspect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IncidentSuspectRepository extends JpaRepository<IncidentSuspect,Integer> {

    @Query("""
            select is from IncidentSuspect is
            where is.incident.id=?1
            """)
    List<Suspect> getAllSuspectsByIncident(int incidentId);

    @Query("""
    SELECT is
    FROM IncidentSuspect is
    JOIN is.incident i
    JOIN i.officer o
    JOIN o.station s
    WHERE s.id = ?1
""")
    List<IncidentSuspect> findAllSuspectsBystationId(int stationId);


    @Query("""
    select new com.cms.dto.IncidentSuspectResponseDto(
        i.incidentType,
        i.incidentStatus,
        i.progressDetails,
        s.name,
        s.contact,
        s.id
    )
    from IncidentSuspect is
    join is.suspect s
    join is.incident i
    where i.id = ?1
""")
    List<IncidentSuspectResponseDto> getAllSuspectsByIncident1(int incidentId);
}
