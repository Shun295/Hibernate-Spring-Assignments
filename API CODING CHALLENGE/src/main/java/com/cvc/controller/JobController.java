package com.cvc.controller;

import com.cvc.dto.JobResPageDto;
import com.cvc.service.JobService;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;
    @GetMapping("allJobs")
    public JobResPageDto getAllJobs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
    {
        return jobService.getAllJobs(page,size);
    }
}
