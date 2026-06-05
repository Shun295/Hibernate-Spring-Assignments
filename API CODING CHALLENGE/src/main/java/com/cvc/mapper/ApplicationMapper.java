package com.cvc.mapper;

import com.cvc.dto.ApplicationResponseDto;
import com.cvc.model.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {
    public ApplicationResponseDto mapEntityToDto(Application application) {
        return new ApplicationResponseDto(
                application.getId(),
                application.getAppliedAt(),
                application.getJob().getTitle(),
                application.getJob().getEmployer().getCompanyName()
        );
    }
}
