package com.bms.service;

import com.bms.dto.AdminReqSignInDto;
import com.bms.dto.CustomerReqSignInDto;
import com.bms.dto.ExecutiveReqSignInDto;
import com.bms.dto.ForgotPasswordDto;
import com.bms.enums.Role;
import com.bms.exception.ResourceNotFoundException;
import com.bms.exception.UserAlreadyPresentException;
import com.bms.model.*;
import com.bms.repository.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AdminRepository adminRepository;
    private final ExecutiveRepository executiveRepository;
    private final BranchRepository branchRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    @Value("${executive.password.temp}")
    private String executiveTempPassword;

    @Value("${customer.password.temp}")
    private String customerTempPassword;

    public void signInAdmin(AdminReqSignInDto adminReqSignInDto) {

        String username = adminReqSignInDto.username();
        String password = adminReqSignInDto.password();

        Role role = Role.ADMIN;

        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);

        user = userService.save(user);

        Admin admin = new Admin();
        admin.setName(adminReqSignInDto.name());
        admin.setUser(user);

        adminRepository.save(admin);
    }

    public void addExecutive(@Valid ExecutiveReqSignInDto dto) {

        String username = dto.username();
        String password = executiveTempPassword;

        Role role = Role.EXECUTIVE;

        if(userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyPresentException("Username is already taken, use a different username");
        }
        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);

        user = userService.save(user);

        Branch branch = branchRepository.findById(dto.branchId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        Executive executive = new Executive();

        executive.setEmployeeId(dto.employeeId());
        executive.setFirstName(dto.firstName());
        executive.setLastName(dto.lastName());
        executive.setEmail(dto.email());
        executive.setPhoneNumber(dto.phoneNumber());
        executive.setGender(dto.gender());
        executive.setDateOfBirth(dto.dateOfBirth());
        executive.setAddress(dto.address());
        executive.setDesignation(dto.designation());
        executive.setBranch(branch);

        executive.setUser(user);

        executiveRepository.save(executive);
    }

    public void addCustomer(@Valid CustomerReqSignInDto dto)
    {
        String username = dto.username();
        String password = customerTempPassword;

        Role role = Role.CUSTOMER;

        if(userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyPresentException("Username is already taken, use a different username");
        }
        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);


        user = userService.save(user);

        Customer customer = new Customer();

        customer.setFirstName(dto.firstName());
        customer.setLastName(dto.lastName());
        customer.setEmail(dto.email());
        customer.setPhoneNumber(dto.phoneNumber());
        customer.setGender(dto.gender());
        customer.setDateOfBirth(dto.dateOfBirth());
        customer.setAddress(dto.address());
        customer.setPanNumber(dto.panNumber());
        customer.setAadharNumber(dto.aadharNumber());

        customer.setUser(user);

        customerRepository.save(customer);
    }



    public void changePassword(String userName, String oldPassword, String newPassword) {
        User user=userRepository.findByUsername(userName).
                orElseThrow(()->new ResourceNotFoundException("user not found"));

        if(!passwordEncoder.matches(oldPassword,user.getPassword()))
        {
            throw new RuntimeException("old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

    }

    public void forgotPassword(ForgotPasswordDto dto
    ) {

        User user = null;
        Customer customer = customerRepository.findByEmail(dto.email()).orElse(null);
        if (customer != null) {
            user = customer.getUser();
        }
        Executive executive = executiveRepository
                        .findByEmail(dto.email()).orElse(null);

        if (executive != null) {
            user = executive.getUser();
        }

        if (user == null) {
            throw new RuntimeException("Email not found");
        }

        user.setPassword(passwordEncoder.encode(dto.newPassword())
        );
        userRepository.save(user);
    }
}
