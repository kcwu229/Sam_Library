package com.samLibrary.samLibrary.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    // Bean to encode passwords using BCrypt hashing algorithm
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Injecting the UserDetailsService dependency
    @Autowired
    private UserDetailsService userDetailsService;

    // Configuring the security filter chain
    // Configuring the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        /*
        The SecurityFilterChain bean configures the security filter chain for the application.
        It defines how HTTP security is handled, including which endpoints are accessible without
        authentication and which require authentication.
         */

        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Disabling CSRF protection
                .authorizeHttpRequests(auth -> auth
                        // Allowing public access to login, signup, forget-password, and register pages
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/signup").permitAll()
                        .requestMatchers("/forget-password").permitAll()
                        .requestMatchers("/api/users/register").permitAll()
                        // Requiring authentication for all other requests
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults()) // Enabling HTTP Basic authentication
                .build();
    }

    // Configuring the authentication provider with user details service and password encoder
    @Bean
    public AuthenticationProvider authenticationProvider() {

        /*
        DaoAuthenticationProvider: A specific implementation of AuthenticationProvider that
        retrieves user details from a UserDetailsService and uses a PasswordEncoder to
        validate the password.
         */

        // Creating an instance of DaoAuthenticationProvider
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        // Setting the UserDetailsService to retrieve user details
        provider.setUserDetailsService(userDetailsService);
        // Setting the PasswordEncoder to encode and verify passwords
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        // Returning the configured authentication provider
        return provider;
    }
}