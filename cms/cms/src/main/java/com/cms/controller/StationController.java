package com.cms.controller;

import com.cms.dto.StationDto;
import com.cms.service.StationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/station")
@AllArgsConstructor
public class StationController {

    private StationService stationService;
@GetMapping("/by-incident")
    public StationDto getStationByIncidentId(@RequestParam int incidentId)
{
    return stationService.getStationByIncidentId(incidentId);
}

}
