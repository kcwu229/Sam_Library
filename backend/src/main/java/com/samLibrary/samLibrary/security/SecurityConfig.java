package com.samLibrary.samLibrary.security;

import com.samLibrary.samLibrary.config.JwtFilter;
import com.samLibrary.samLibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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

    @Autowired
    private JwtFilter jwtFilter;
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
                .cors(Customizer.withDefaults())
                // Disabling session management
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Allowing public access to login, signup, forget-password, and register pages
                        .requestMatchers("/api/users/login").permitAll()
                        //.requestMatchers(HttpMethod.GET,"/api/books").permitAll()
                                .requestMatchers(HttpMethod.GET,"/books/{id}/.png").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/books/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/books-reviews/all/{bookId}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/authors").permitAll()
                                .requestMatchers(HttpMethod.GET,"/authors/{id}/.png").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/authors/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/authors-reviews/all/{authorId}").permitAll()
                        .requestMatchers("/signup").permitAll()
                        .requestMatchers("/forget-password").permitAll()
                        .requestMatchers("/api/users/register").permitAll()
                         //Requiring authentication for all other requests
                        .anyRequest().authenticated()
                        //.anyRequest().permitAll()

                )
                .httpBasic(Customizer.withDefaults()) // Enabling HTTP Basic authentication
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
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

    // authentication manager will talk to the authentication provider to authenticate the user
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}