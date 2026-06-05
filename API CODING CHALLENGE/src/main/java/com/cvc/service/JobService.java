package com.cvc.service;

import com.cvc.dto.JobResPageDto;
import com.cvc.dto.JobResponseDto;
import com.cvc.mapper.JobMapper;
import com.cvc.model.Job;
import com.cvc.repository.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    public JobResPageDto getAllJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Job> pages = jobRepository.findAll(pageable);
        List<Job> list=pages.getContent();

        List<JobResponseDto> data =list
                        .stream()
                        .map(jobMapper::mapEntityToDto)
                        .toList();
        return new JobResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }
}
