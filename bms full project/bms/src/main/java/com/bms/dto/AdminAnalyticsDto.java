package com.bms.dto;

import java.util.List;

public record AdminAnalyticsDto(

        List<String> labels,

        List<Long> counts

) {
}