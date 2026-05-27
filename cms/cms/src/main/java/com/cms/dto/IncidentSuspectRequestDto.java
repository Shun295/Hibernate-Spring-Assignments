package com.cms.dto;

import com.cms.model.Suspect;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



public record IncidentSuspectRequestDto(
        @NotBlank
        @NotNull
        @Size(max = 500)
        String details
) {
}
