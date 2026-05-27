package com.bank.dto;

import com.bank.model.Account;

import java.util.List;

public record AccountResponseDto(
        int pageNo,
        long elementRecord,
        List<Account> acc
) {
}
