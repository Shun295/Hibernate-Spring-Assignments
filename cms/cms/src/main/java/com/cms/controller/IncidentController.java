package com.cms.controller;

import com.cms.dto.IncidentDto;
import com.cms.dto.IncidentRespDto;
import com.cms.dto.OfficerDto;
import com.cms.enums.IncidentType;
import com.cms.exception.ResourceNotFoundException;
import com.cms.model.Incident;
import com.cms.service.IncidentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class IncidentController {

    private IncidentService incidentService;

    @GetMapping("/api/incident/all")
    public List<Incident> getAll()
    {

        return incidentService.getAll();
    }

    @GetMapping("/api/incident/all/v2")
    public IncidentRespDto getAllV2(@RequestParam int page,
                                    @RequestParam int size)
    {
        return incidentService.getAllWithPagination(page,size);
    }

    @GetMapping("/api/incident/type")
    public List<Incident> getByIncidentType(@RequestParam IncidentType incidentType)
    {
        return incidentService.getByIncidentType(incidentType);
    }

    @PostMapping("/api/incident/add")
    public void addIncident(@Valid @RequestBody IncidentDto dto)
    {

        incidentService.addIncident(dto);
    }

    @PostMapping("/api/incident/add/v2/{officerId}")
    public void addOfficerToIncident(@Valid @RequestBody IncidentDto dto,@PathVariable int officerId)
    {

        incidentService.addOfficerToIncident(dto,officerId);
    }

    @GetMapping("/api/incident/get-one/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable int id)
    {
            return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    @DeleteMapping("/api/incident/delete/{id}")
    public void deleteIncidentById(@PathVariable int id)
    {
            incidentService.deleteIncidentById(id);
    }

    @PutMapping("/api/incident/update/{id}")
    public void updateIncident(@PathVariable int id, @RequestBody Incident updatedIncident)
    {
            incidentService.updateIncident(id,updatedIncident);
    }

    @GetMapping("/api/incident/officer/{officerId}")
    public List<OfficerDto> getIncidentByOfficerId(@PathVariable int officerId)
    {
        return  incidentService.getIncidentByOfficerId(officerId);
    }

   @GetMapping("/api/incident/officer")
    public List<OfficerDto> getIncidentByOfficerUsername(@RequestParam String officerUsername)
    {
        return  incidentService.getIncidentByOfficerUsername(officerUsername);
    }

}
