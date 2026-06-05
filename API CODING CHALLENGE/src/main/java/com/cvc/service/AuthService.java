package com.cvc.service;

import com.cvc.dto.EmployerSignInReqDto;
import com.cvc.dto.SeekerSignInReqDto;
import com.cvc.enums.Role;
import com.cvc.mapper.EmployerMapper;
import com.cvc.mapper.SeekerMapper;
import com.cvc.mapper.UserMapper;
import com.cvc.model.Employer;
import com.cvc.model.Seeker;
import com.cvc.model.User;
import com.cvc.repository.EmployerRepository;

import com.cvc.repository.SeekerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;

    private final EmployerMapper employerMapper;
    private final EmployerRepository employerRepository;
    private final UserMapper userMapper;
    private final UserService userService;
    private final SeekerMapper seekerMapper;
    private final SeekerRepository seekerRepository;

    public void signIn(EmployerSignInReqDto signInReqDto) {
        Employer employer=employerMapper.mapDtoToEntity(signInReqDto);
        User user=userMapper.mapDtoEntity(signInReqDto);
        user.setRole(Role.EMPLOYER);
        user.setPassword(passwordEncoder.encode(signInReqDto.password()));
        user=userService.save(user);
        employer.setUser(user);
        employerRepository.save(employer);
    }

    public void seekerSignIn(SeekerSignInReqDto seekerSignInReqDto) {
        Seeker seeker=seekerMapper.mapDtoToEntity(seekerSignInReqDto);
        User user=userMapper.mapDtoEntity(seekerSignInReqDto);
        user.setRole(Role.SEEKER);
        user.setPassword(passwordEncoder.encode(seekerSignInReqDto.password()));
        user=userService.save(user);
        seeker.setUser(user);
        seekerRepository.save(seeker);
    }
}
