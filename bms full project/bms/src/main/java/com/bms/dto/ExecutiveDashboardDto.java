package com.bms.dto;

public record ExecutiveDashboardDto(
        Long customersManaged,

        Long accountOpeningRequests,

        Long loanRequests,

        Long transactionsToday,

        Long pendingClosures,

        Long jointAccountRequests
) {
}
