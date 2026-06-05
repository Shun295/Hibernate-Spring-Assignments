package com.cvc.controller;

import com.cvc.dto.EmployerSignInReqDto;
import com.cvc.dto.SeekerSignInReqDto;
import com.cvc.dto.TokenDto;
import com.cvc.service.AuthService;
import com.cvc.service.UserService;
import com.cvc.utility.JwtUtility;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;
    private UserService userService;
    private JwtUtility jwtUtility;

    @PostMapping("/employer/register")
    public void employerSignIn(@RequestBody EmployerSignInReqDto signInReqDto)
    {
        authService.signIn(signInReqDto);
    }

    @PostMapping("/seeker/register")
    public void seekerSignIn(@RequestBody SeekerSignInReqDto seekerSignInReqDto)
    {
        authService.seekerSignIn(seekerSignInReqDto);
    }

    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username,token);
    }


}
