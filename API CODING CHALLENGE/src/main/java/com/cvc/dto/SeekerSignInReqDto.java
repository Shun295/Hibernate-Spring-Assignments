package com.cvc.dto;

public record SeekerSignInReqDto(
        String name,
        String resumeSummary,
        String username,
        String password
) {
}
