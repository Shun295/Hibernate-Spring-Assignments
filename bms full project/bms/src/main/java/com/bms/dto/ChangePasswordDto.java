package com.bms.dto;

public record ChangePasswordDto(
        String oldPassword,
        String newPassword
) {
}
