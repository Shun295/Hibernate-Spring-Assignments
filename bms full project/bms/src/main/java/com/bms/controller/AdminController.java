package com.bms.controller;

import com.bms.dto.CombinedStatDto;
import com.bms.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin-dashboard")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public CombinedStatDto getDashboardStats() {
        return adminService.getDashboardStats();
    }


}
