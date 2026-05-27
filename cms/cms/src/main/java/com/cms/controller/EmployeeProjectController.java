package com.cms.controller;

import com.cms.dto.EmployeeProjectResponseDto;
import com.cms.service.EmployeeProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee/project")
@AllArgsConstructor
public class EmployeeProjectController {

    private EmployeeProjectService employeeProjectService;

    @PostMapping("/add/{employeeId}/{projectId}")
    public void add(@PathVariable int employeeId,
                    @PathVariable int projectId,
                    @Valid @RequestBody EmployeeProjectResponseDto dto)
    {
        employeeProjectService.add(employeeId,projectId,dto);

    }
}
