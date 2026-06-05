package com.cvc.service;

import com.cvc.dto.CreateJobRequestDto;
import com.cvc.exception.ResourceNotFoundException;
import com.cvc.mapper.JobMapper;
import com.cvc.model.Employer;
import com.cvc.model.Job;
import com.cvc.repository.EmployerRepository;
import com.cvc.repository.JobRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final JobMapper jobMapper;
    private final JobRepository jobRepository;

    public void createJobRequest(@Valid CreateJobRequestDto createJobRequestDto, Principal principal) {
        String username=principal.getName();
        Employer employer=employerRepository.findByUserUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("Employer is not valid"));

        Job job=jobMapper.mapDtoToentity(createJobRequestDto);
        job.setEmployer(employer);
        jobRepository.save(job);
    }
}
