package com.cvc.service;

import com.cvc.dto.ApplicationResPageDto;
import com.cvc.dto.ApplicationResponseDto;
import com.cvc.exception.ResourceNotFoundException;
import com.cvc.mapper.ApplicationMapper;
import com.cvc.model.Application;
import com.cvc.model.Job;
import com.cvc.model.Seeker;
import com.cvc.repository.ApplicationRepository;
import com.cvc.repository.JobRepository;
import com.cvc.repository.SeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final SeekerRepository seekerRepository;
    private final ApplicationMapper applicationMapper;

    public void applyJob(int jobId, String username) {
        Job job = jobRepository.findById(jobId).
                orElseThrow(()->new ResourceNotFoundException("job not found Exception"));

        Seeker seeker = seekerRepository.findByUserUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("Seeker not found"));
        Application application = new Application();
        application.setAppliedAt(Instant.now());
        application.setJob(job);
        application.setSeeker(seeker);
        applicationRepository.save(application);
    }

    public ApplicationResPageDto getMyApplications(String username, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Application> pages = applicationRepository.findBySeekerUserUsername(username, pageable);
        List<Application> list=pages.getContent();
        List<ApplicationResponseDto> data =list
                        .stream()
                        .map(applicationMapper::mapEntityToDto)
                        .toList();

        return new ApplicationResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }
}
