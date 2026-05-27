package com.cms.controller;

import com.cms.dto.IncidentSuspectRequestDto;
import com.cms.dto.IncidentSuspectResponseDto;
import com.cms.dto.SuspectResponseDto;
import com.cms.model.Suspect;
import com.cms.service.IncidentSuspectService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incident/suspect")
@AllArgsConstructor
public class IncidentSuspectController {

    private IncidentSuspectService incidentSuspectService;

    @PostMapping("/add/{incidentId}/{suspectId}")
    public void add(@PathVariable int incidentId,
                    @PathVariable int suspectId,
                    @RequestBody IncidentSuspectRequestDto dto)
    {
        incidentSuspectService.add(incidentId,suspectId,dto);
    }

   /* @GetMapping("/by-incident/{incidentId}")
    public List<IncidentSuspectResponseDto> getAllSuspectsByIncident(@PathVariable int incidentId)
    {
        return incidentSuspectService.getAllSuspectsByIncident(incidentId);
    }*/
   @GetMapping("/by-incident/{incidentId}")
    public List<IncidentSuspectResponseDto> getAllSuspectsByIncident(@PathVariable int incidentId)
    {
        return incidentSuspectService.getAllSuspectsByIncident(incidentId);
    }
    @GetMapping("/by-station/{stationId}")
    public List<SuspectResponseDto> getAllSuspectsByStation(@PathVariable int stationId)
    {
        return incidentSuspectService.getAllSuspectsByStation(stationId);
    }
}


