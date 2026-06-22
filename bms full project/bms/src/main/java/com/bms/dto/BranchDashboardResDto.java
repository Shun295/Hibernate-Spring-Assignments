package com.bms.dto;

public record BranchDashboardResDto(
        long totalBranches,
        long activeBranches,
        long inactiveBranches,
        long totalExecutives,
        long totalCustomers
) {
}
