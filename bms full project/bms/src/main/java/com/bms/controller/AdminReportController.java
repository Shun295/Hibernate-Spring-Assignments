package com.bms.controller;

import com.bms.dto.AdminAnalyticsDto;
import com.bms.dto.CustomerGrowthDto;
import com.bms.service.AdminReportService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin-report")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminReportController {

    private final AdminReportService adminReportService;

    @GetMapping("/analytics")
    public AdminAnalyticsDto
    getAnalytics() {

        return adminReportService.getAnalytics();

    }

    @GetMapping("/customer-growth")
    public CustomerGrowthDto
    getCustomerGrowth() {

        return adminReportService.getCustomerGrowth();

    }

}