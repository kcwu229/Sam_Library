package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.AuthenticationRequest;
import com.samLibrary.samLibrary.dto.AuthenticationResponse;
import com.samLibrary.samLibrary.dto.RegisterRequest;
import com.samLibrary.samLibrary.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
            ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (
            @RequestBody AuthenticationRequest request
            ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
