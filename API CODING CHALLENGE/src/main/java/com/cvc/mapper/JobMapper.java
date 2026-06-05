package com.cvc.mapper;

import com.cvc.dto.CreateJobRequestDto;
import com.cvc.dto.JobResponseDto;
import com.cvc.model.Job;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {
    public Job mapDtoToentity(@Valid CreateJobRequestDto createJobRequestDto) {
        Job job=new Job();
        job.setTitle(createJobRequestDto.title());
        job.setDescription(createJobRequestDto.description());
        job.setLocation(createJobRequestDto.location());
        job.setSalary(createJobRequestDto.salary());
        return job;
    }

    public JobResponseDto mapEntityToDto(Job job) {
        return new JobResponseDto(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getSalary(),
                job.getEmployer().getCompanyName()
        );
    }
}
