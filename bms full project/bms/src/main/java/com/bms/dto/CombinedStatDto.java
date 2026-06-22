package com.bms.dto;

import java.util.List;

public record CombinedStatDto(
        List<String> label,
        List<Long> count
) {
}
