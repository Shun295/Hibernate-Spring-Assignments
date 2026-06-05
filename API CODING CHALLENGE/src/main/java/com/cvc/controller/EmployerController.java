package com.cvc.controller;

import com.cvc.dto.CreateJobRequestDto;
import com.cvc.dto.JobResPageDto;
import com.cvc.service.EmployerService;
import com.cvc.service.JobService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class EmployerController {
    private final EmployerService employerService;


    @PostMapping("newJob")
    public void createJobRequest(@Valid @RequestBody CreateJobRequestDto createJobRequestDto,
                                 Principal principal)
    {
        employerService.createJobRequest(createJobRequestDto,principal);
    }


}
