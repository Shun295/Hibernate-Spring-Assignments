package com.cvc.mapper;

import com.cvc.dto.SeekerSignInReqDto;
import com.cvc.model.Seeker;
import org.springframework.stereotype.Component;

@Component
public class SeekerMapper {
    public Seeker mapDtoToEntity(SeekerSignInReqDto seekerSignInReqDto) {
        Seeker seeker=new Seeker();
        seeker.setResumeSummary(seekerSignInReqDto.resumeSummary());
        return seeker;
    }
}
