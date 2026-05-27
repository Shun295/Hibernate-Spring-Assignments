package com.cms.mapper;

import com.cms.dto.EmployeeProjectResponseDto;
import com.cms.model.EmployeeProject;
import org.springframework.stereotype.Component;

@Component
public record EmployeeProjectMapper() {
    public EmployeeProject mapDtoToEntity(EmployeeProjectResponseDto dto) {
        EmployeeProject employeeProject=new EmployeeProject();

        employeeProject.setAllotedDate(dto.allotedDate());
        employeeProject.setRoleDetails(dto.roleDetails());
        employeeProject.setDuration(dto.duration());
        return employeeProject;

    }
}
