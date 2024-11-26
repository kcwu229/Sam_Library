package com.samLibrary.samLibrary.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samLibrary.samLibrary.dto.AuthenticationRequest;
import com.samLibrary.samLibrary.dto.AuthenticationResponse;
import com.samLibrary.samLibrary.dto.RegisterRequest;
import com.samLibrary.samLibrary.entity.Role;
import com.samLibrary.samLibrary.entity.Token;
import com.samLibrary.samLibrary.entity.TokenType;
import com.samLibrary.samLibrary.repository.TokenRepository;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.AuthenticationService;
import com.samLibrary.samLibrary.service.JWTService;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import com.samLibrary.samLibrary.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;


    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);



    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(
                encoder.encode(request.getPassword())
        );
        user.setEmail(request.getEmail());
        user.setLastName(request.getLastName());
        user.setLastName(request.getLastName());
        user.setRole(Role.USER);
        userRepository.save(user);

        // generate token
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(token)
                .role(user.getRole())
                .id(user.getId())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            logger.info("Authenticating user: " + request.getUsername());
            logger.info("Authenticating user: " + request.getPassword());

            authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            // Log the exception for debugging purposes
            System.out.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException("Bad credentials");
        }

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(token)
                .role(user.getRole())
                .id(user.getId())
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException, java.io.IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        String username = jwtService.extractUserName(refreshToken);
        if (username != null) {
            var user = this.userRepository.findByUsername(username).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}