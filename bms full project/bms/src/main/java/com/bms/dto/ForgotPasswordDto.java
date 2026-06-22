package com.bms.dto;

public record ForgotPasswordDto(
        String email,
        String newPassword
) {
}
