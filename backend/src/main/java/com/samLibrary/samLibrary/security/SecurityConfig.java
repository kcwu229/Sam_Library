package com.samLibrary.samLibrary.security;

import com.samLibrary.samLibrary.config.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${allowed.origin}")
    private String allowedOrigin;

    // Bean to encode passwords using BCrypt hashing algorithm
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Injecting the UserDetailsService dependency
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        // image png files for permitted access
        String[] StaticResources = {
                "/books/{id}.png",
                "/authors/{id}.png"
        };
        return

                httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Disabling CSRF protection
                .cors(Customizer.withDefaults())
                // Disabling session management
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Configuring the requests that need to be authorized
                .authorizeHttpRequests(auth -> auth
                        // Allowing public access to login, signup, forget-password, and register pages
                                .requestMatchers(StaticResources).permitAll()
                                .requestMatchers("/api/cache/clear").permitAll()
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/auth/**", "/oauth2/**", "/login/**", "/error").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/books/categories").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/books").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/books/search").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/books/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/books-reviews/all/{bookId}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/authors").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/authors/{id}").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/authors-reviews/all/{authorId}").permitAll()
                        .requestMatchers("/signup").permitAll()
                                .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/forget-password").permitAll()
                        .requestMatchers("/api/users/register").permitAll()
                                .requestMatchers("/proxy").permitAll()
                                // for redirecting to google and github login pages
                                .requestMatchers("/api/oauth/login").permitAll()

                         //Requiring authentication for all other requests
                        .anyRequest().authenticated()
                        )
                        // Configuring the login page with oauth2Login and httpBasic

                .httpBasic(Customizer.withDefaults()) // Enabling HTTP Basic authentication
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Configuring the authentication provider with user details service and password encoder

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedMethod("*");
        configuration.setAllowedOrigins(List.of(allowedOrigin));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}