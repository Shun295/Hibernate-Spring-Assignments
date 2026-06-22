package com.bms.dto;

import java.math.BigDecimal;
import java.util.List;

public record MonthlySpendingDto(
        List<String> label,
        List<BigDecimal> amount
) {
}
