package com.bms.controller;

import com.bms.dto.*;
import com.bms.model.Customer;
import com.bms.model.Executive;
import com.bms.model.User;
import com.bms.repository.CustomerRepository;
import com.bms.repository.ExecutiveRepository;
import com.bms.service.AuthService;
import com.bms.service.UserService;
import com.bms.utility.JwtUtility;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final JwtUtility jwtUtility;
    private final ExecutiveRepository executiveRepository;
    private final CustomerRepository customerRepository;

    //ADMIN SIGN IN AND LOGIN WITH JWT TOKEN
    @PostMapping("/admin/signIn")
    public void signInAdmin(
            @RequestBody AdminReqSignInDto adminReqSignInDto) {
        authService.signInAdmin(adminReqSignInDto);
    }

    //login-admin,executive and customer
    @GetMapping("/login")
    public TokenDto login(Principal principal){
        String username = principal.getName();
        String token = jwtUtility.generateToken(username);
        return new TokenDto(username, token);
    }


    @GetMapping("/user-details")
    public LoginResponseDto getAdminDetails(Principal principal){

        User user = (User) userService.loadUserByUsername(principal.getName());
        return new LoginResponseDto(
                user.getId(),
                user.getUsername(),
                user.getRole().toString()
        );
    }

    //EXECUTIVE SIGN IN AND LOGIN WITH JWT TOKEN BY EXECUTIVE
    @PostMapping("/executive/add")
    public void addExecutive(@Valid @RequestBody ExecutiveReqSignInDto dto) {
        authService.addExecutive(dto);
    }



    //add customer by executive
    @PostMapping("/customer/add")
    public void addCustomer(@RequestBody CustomerReqSignInDto dto)
    {

        authService.addCustomer(dto);
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordDto dto, Principal principal
    ) {
        String userName=principal.getName();
        authService.changePassword(userName,
                dto.oldPassword(),
                dto.newPassword()
        );
    }

    @PutMapping("/forgot-password")
    public void forgotPassword(
            @RequestBody ForgotPasswordDto dto
    ) {
        authService.forgotPassword(dto);
    }


}
