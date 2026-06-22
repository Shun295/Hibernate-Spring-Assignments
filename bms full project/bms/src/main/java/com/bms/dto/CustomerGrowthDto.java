package com.bms.dto;

import java.util.List;

public record CustomerGrowthDto(

        List<String> months,

        List<Long> counts

) {
}