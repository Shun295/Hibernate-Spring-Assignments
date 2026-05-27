package com.cms.service;

import com.cms.exception.ResourceNotFoundException;
import com.cms.model.Employee;
import com.cms.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    public Employee getByEmployeeId(int employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee Id is invalid"));
    }
}
