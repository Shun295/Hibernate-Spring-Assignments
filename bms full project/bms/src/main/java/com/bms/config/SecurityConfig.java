package com.bms.config;

import com.bms.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserService userService;
    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
        HttpMethod.GET,
        "/api/admin-report/**"
)
.hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/auth/admin/signIn").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/auth/login").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/auth/executive/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/api/auth/customer/add").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/auth/user-details").hasAnyAuthority("ADMIN","EXECUTIVE","CUSTOMER")
                        .requestMatchers(HttpMethod.PUT,"/api/auth/change-password").authenticated()
                         .requestMatchers(HttpMethod.PUT,"/api/auth/forgot-password").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/admin-dashboard/dashboard").hasAuthority("ADMIN")
.requestMatchers(HttpMethod.GET,"/api/executive/my-profile").hasAuthority("EXECUTIVE")
                                .requestMatchers(HttpMethod.GET,"/api/customer/my-profile").hasAuthority("CUSTOMER")
                                .requestMatchers(HttpMethod.POST,"/api/beneficiary/add").hasAuthority("CUSTOMER")
                                .requestMatchers(HttpMethod.GET,"/api/beneficiary/all").hasAuthority("CUSTOMER")


.requestMatchers(
        HttpMethod.GET,
        "/api/executive/search"
)
.hasAuthority("ADMIN")

                        //executive
                        .requestMatchers(
        HttpMethod.GET,
        "/api/executive/dashboard"
)
.hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/executive/admin/executive/getAll").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/executive/branch/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/executive/designation").hasAuthority("ADMIN")

                                .requestMatchers(HttpMethod.GET,"/api/branch/customer/my-branch").hasAuthority("CUSTOMER")
                                .requestMatchers(HttpMethod.GET,"/api/branch/my-branch").hasAuthority("EXECUTIVE")

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/customer/my-branch"
                                )
                                .hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/executive/admin/executive/search").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/executive/exe/update/*").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT, "/api/executive/admin/executive/update/*").hasAuthority("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/executive/delete/*").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/executive/get/*").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/executive/get/username").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT, "/api/executive/update/{executiveId}").hasAuthority("EXECUTIVE")

                        //customer
                        .requestMatchers(HttpMethod.GET, "/api/v1/customer/monthly-spending").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/customer/Admin/getAll").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/v1/customer/Admin/getById/{customerId}").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/v1/customer/Admin/username/{username}").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/customer/branch/{branchId").hasAuthority("ADMIN")
                               .requestMatchers(HttpMethod.PUT,"/api/customer/v1/update/{customerId}").hasAnyAuthority("ADMIN", "EXECUTIVE")
                                // Account Opening - Customer

                                .requestMatchers( HttpMethod.POST, "/api/accountOpeningReq/apply").hasAuthority("CUSTOMER")
                                .requestMatchers(HttpMethod.GET,"/api/accountOpeningReq/my-requests" ).hasAuthority("CUSTOMER")


// Account Opening - Admin

                                .requestMatchers(HttpMethod.GET, "/api/accountOpeningReq/reviewed").hasAuthority("ADMIN")
                                .requestMatchers( HttpMethod.PUT,"/api/accountOpeningReq/*/approve").hasAuthority("ADMIN")
                                .requestMatchers( HttpMethod.PUT,"/api/accountOpeningReq/*/reject" ).hasAuthority("ADMIN")


// Account Opening - Executive

                                .requestMatchers( HttpMethod.GET, "/api/accountOpeningReq/pending"  ).hasAuthority("EXECUTIVE")
                                .requestMatchers( HttpMethod.PUT, "/api/accountOpeningReq/*/review" ).hasAuthority("EXECUTIVE")


// Shared (Executive + Admin)

                                .requestMatchers(HttpMethod.GET,"/api/accountOpeningReq/*/admin" ).hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/accountOpeningReq/*").hasAnyAuthority("EXECUTIVE", "ADMIN")

                        //beneficiary
                        .requestMatchers(HttpMethod.POST, "/api/beneficiary/add").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/beneficiary/all").hasRole("CUSTOMER")

                        //file

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/file/view/*"
                        ).hasAnyAuthority(
                                "EXECUTIVE",
                                "ADMIN"
                        )
                        //joint acc
                        .requestMatchers(HttpMethod.GET,"/api/jointAccReq/search-holder").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/jointAccReq/my-requests").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/jointAccReq/request").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/jointAccReq/pending").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT, "/api/jointAccReq/*/review").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/jointAccReq/reviewed").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/jointAccReq/*/approve").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/jointAccReq/*/reject").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/jointAccReq/*/holders").hasAnyAuthority("ADMIN", "EXECUTIVE")

                        //accountclosurereq api
                        .requestMatchers(HttpMethod.POST,"/api/accountClosure/customer/request").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/all").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/my-request").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/{requestId}").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/pending").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT,"/api/accountClosure/{requestId}/approve").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/accountClosure/{requestId}/reject").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/accountClosure/{requestId}/cancel").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT,"/api/accountClosure/{requestId}/review").hasAuthority("EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/reviewed").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/accountClosure/admin/dashboard").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/accountClosure/admin/status").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/accountClosure/admin/*/decision").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/accountClosure/admin/search").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/accountClosure/search" ).hasAnyAuthority("ADMIN", "EXECUTIVE")
                        .requestMatchers(HttpMethod.GET, "/api/accountClosure/filter").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        //account type
                        .requestMatchers(HttpMethod.POST,"/api/account-type/create").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/account-type/all").hasAnyAuthority("CUSTOMER","ADMIN","EXECUTIVE")
                         //account api
                        .requestMatchers(HttpMethod.GET,"/api/account/my-branch").hasAuthority("EXECUTIVE")

                        .requestMatchers(HttpMethod.GET,"/api/account/my-accounts").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/account/*").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/account/all").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/account/number/{accountNumber}").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/account/customer/{customerId}").hasAnyAuthority("ADMIN","EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/account/branch/{branchId}").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT,"/api/account/{accountId}/activate").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/account/{accountId}/block").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/account/{accountId}/close").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/account/{accountId}/holders").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        //branch api
                        .requestMatchers(HttpMethod.POST,"/api/branch/admin/addBranch").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/branch/all").hasAnyAuthority("ADMIN", "EXECUTIVE", "CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/branch/{id}").hasAnyAuthority("ADMIN", "EXECUTIVE","CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/branch/ifsc/{ifscCode}").hasAnyAuthority("ADMIN", "EXECUTIVE","CUSTOMER")

                        .requestMatchers(HttpMethod.PUT,"/api/branch/admin/update/{branchId}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/branch/activate/{branchId}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/branch/deactivate/{branchId}").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/branch/admin/dashboard").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/branch/all-list").hasAuthority("ADMIN")

                         // TRANSACTION
.requestMatchers(HttpMethod.GET,"/api/transaction/admin/statement").hasAuthority("ADMIN")
.requestMatchers(HttpMethod.GET,"/api/transaction/filter").hasAnyAuthority("ADMIN","EXECUTIVE")
                         .requestMatchers(HttpMethod.GET,"/api/transaction/monitoring/*").hasAnyAuthority("EXECUTIVE","ADMIN")
.requestMatchers(HttpMethod.GET,"/api/transaction/all").hasAnyAuthority("ADMIN","EXECUTIVE")
.requestMatchers(HttpMethod.POST,"/api/transaction/deposit").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.POST,"/api/transaction/withdrawal").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.POST,"/api/transaction/transfer").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/transaction/history/**").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/transaction/customer/filter/**").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/transaction/mini-statement/**").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/transaction/statement/**").hasAuthority("CUSTOMER")

.requestMatchers( HttpMethod.GET,"/api/transaction/summary/**").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/transaction/details/*").hasAnyAuthority("CUSTOMER","EXECUTIVE","ADMIN")

                        //BENEFICIARY
                                .requestMatchers(HttpMethod.PUT, "/api/beneficiary/activate/**").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.PUT, "/api/beneficiary/deactivate/**").hasAuthority("CUSTOMER")

                        //loanType
                        .requestMatchers(HttpMethod.POST, "/api/loan-type/create").hasAuthority("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/loan-type/all").hasAnyAuthority("ADMIN", "EXECUTIVE", "CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/loan-type/*").hasAnyAuthority("ADMIN", "CUSTOMER", "EXECUTIVE")
                        .requestMatchers(HttpMethod.PUT, "/api/loan-type/*/update").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/loan-type/delete/*").hasAuthority("ADMIN")
                      //loan-application
                                // loan-application
.requestMatchers(HttpMethod.POST,"/api/loan-application/apply").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/loan-application/my-applications").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.PUT,"/api/loan-application/customer/resubmit/*").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/loan-application/customer/*").hasAuthority("CUSTOMER")

.requestMatchers(HttpMethod.GET,"/api/loan-application/pending").hasAuthority("EXECUTIVE")

.requestMatchers(HttpMethod.PUT,"/api/loan-application/*/review").hasAuthority("EXECUTIVE")

.requestMatchers(HttpMethod.GET,"/api/loan-application/reviewed").hasAuthority("ADMIN")

.requestMatchers(HttpMethod.GET,"/api/loan-application/*/approve").hasAuthority("ADMIN")

.requestMatchers(HttpMethod.PUT,"/api/loan-application/*/reject").hasAuthority("ADMIN")

// More specific first
.requestMatchers(HttpMethod.GET,"/api/loan-application/*/admin").hasAuthority("ADMIN")

.requestMatchers(HttpMethod.GET, "/api/loan-application/*").hasAuthority("EXECUTIVE")
                                //loan api
                                .requestMatchers(HttpMethod.GET,"/api/loan/monitoring").hasAnyAuthority("ADMIN","EXECUTIVE")
                                // Loan Dashboard
                                .requestMatchers( HttpMethod.GET,"/api/loan/dashboard").hasAnyAuthority("ADMIN","EXECUTIVE")
                                .requestMatchers(HttpMethod.GET,"/api/loan/overdue")
                                .hasAnyAuthority("ADMIN","EXECUTIVE")
                                .requestMatchers(HttpMethod.GET, "/api/loan/my-loans").hasAuthority("CUSTOMER")
                                .requestMatchers(HttpMethod.GET, "/api/loan/all").hasAnyAuthority("ADMIN","EXECUTIVE")

                                .requestMatchers(HttpMethod.GET, "/api/loan/account/*").hasAnyAuthority("ADMIN", "EXECUTIVE")

                                .requestMatchers(HttpMethod.GET, "/api/loan/status/*").hasAuthority("ADMIN")

                                .requestMatchers(HttpMethod.GET,"/api/loan/monitoring/*").hasAnyAuthority("ADMIN", "EXECUTIVE")

                                .requestMatchers(HttpMethod.GET, "/api/loan/*").hasAnyAuthority("ADMIN", "EXECUTIVE")

                                .requestMatchers(HttpMethod.PUT, "/api/loan/*/complete").hasAuthority("ADMIN")

                                .requestMatchers(HttpMethod.PUT, "/api/loan/*/close").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/loan/*/default").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PUT,"/api/loan/admin/send-reminder/**").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        //loanrepayment
                        .requestMatchers(HttpMethod.POST,"/api/repayment/pay").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/repayment/my-repayments").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/repayment/all").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        .requestMatchers(HttpMethod.GET,"/api/repayment/summary/*").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/loan-repayment/loan/*").hasAnyAuthority("ADMIN", "EXECUTIVE")
                        .anyRequest().authenticated()
                );
        http.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider dao=new DaoAuthenticationProvider(userService);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
