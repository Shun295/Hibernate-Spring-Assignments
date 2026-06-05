package com.cvc.controller;

import com.cvc.dto.ApplicationResPageDto;
import com.cvc.service.ApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/application")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/job/{jobId}")
    public void applyJob(@PathVariable int jobId, Principal principal) {
        String username = principal.getName();
        applicationService.applyJob(jobId, username);
    }

    @GetMapping("/my-applications")
    public ApplicationResPageDto getMyApplications(Principal principal, @RequestParam(defaultValue = "0")int page, @RequestParam(defaultValue = "10") int size) {
        String username = principal.getName();
        return applicationService.getMyApplications(username, page, size);
    }
}
