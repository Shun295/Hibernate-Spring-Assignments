package com.cms.service;

import com.cms.dto.EmployeeProjectResponseDto;
import com.cms.mapper.EmployeeProjectMapper;
import com.cms.model.Employee;
import com.cms.model.EmployeeProject;
import com.cms.model.Project;
import com.cms.repository.EmployeeProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeProjectService {

    private EmployeeService employeeService;
    private ProjectService projectService;
    private EmployeeProjectRepository employeeProjectRepository;
    private EmployeeProjectMapper employeeProjectMapper;

    public void add(int employeeId, int projectId, EmployeeProjectResponseDto dto) {
        //fetch employee by id
        Employee employee=employeeService.getByEmployeeId(employeeId);

        //fetch project by id
        Project project=projectService.getByProjectId(projectId);

        //map dto to entity
        EmployeeProject employeeProject=employeeProjectMapper.mapDtoToEntity(dto);

        employeeProject.setEmployee(employee);
        employeeProject.setProject(project);

        employeeProjectRepository.save(employeeProject);
    }
}
