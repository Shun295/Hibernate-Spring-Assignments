package com.cms.service;

import com.cms.exception.ResourceNotFoundException;
import com.cms.model.Project;
import com.cms.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProjectService {

    private ProjectRepository projectRepository;
    public Project getByProjectId(int projectId) {
        return projectRepository.findById(projectId).orElseThrow(()->new ResourceNotFoundException("Project Id is not valid"));
    }
}
