package com.cms.controller;

import com.cms.dto.OfficerResponseDto;
import com.cms.dto.OfficerStationDto;
import com.cms.service.OfficerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class OfficerController {

    private OfficerService officerService;

    @GetMapping("/api/officer/by-station-head")
    public List<OfficerResponseDto> getOfficersByStationHead(
            @RequestParam String stationHeadUsername) {

        return officerService.getOfficersByStationHead(stationHeadUsername);
    }

    @GetMapping("/api/officer/by-station-title")
    public List<OfficerStationDto> getOfficersByStationTitle(@RequestParam String stationTitle)
    {
        return officerService.getOfficersByStationTitle(stationTitle);
    }
}
