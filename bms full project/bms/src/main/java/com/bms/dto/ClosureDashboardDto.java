package com.bms.dto;

public record ClosureDashboardDto(
        long reviewedRequests,
        long approvedClosures,
        long rejectedRequests
) {
}
