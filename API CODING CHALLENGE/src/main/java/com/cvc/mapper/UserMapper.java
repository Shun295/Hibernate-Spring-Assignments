package com.cvc.mapper;

import com.cvc.dto.EmployerSignInReqDto;
import com.cvc.dto.SeekerSignInReqDto;
import com.cvc.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User mapDtoEntity(EmployerSignInReqDto signInReqDto) {
        User user=new User();
        user.setName(signInReqDto.name());
        user.setUsername(signInReqDto.username());
        user.setPassword(signInReqDto.password());
        return user;
    }

    public User mapDtoEntity(SeekerSignInReqDto seekerSignInReqDto) {
        User user=new User();
        user.setName(seekerSignInReqDto.name());
        user.setUsername(seekerSignInReqDto.username());
        user.setPassword(seekerSignInReqDto.password());
        return user;
    }

}
