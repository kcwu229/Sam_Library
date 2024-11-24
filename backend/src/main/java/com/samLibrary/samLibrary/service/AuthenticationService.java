package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthenticationRequest;
import com.samLibrary.samLibrary.dto.AuthenticationResponse;
import com.samLibrary.samLibrary.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException;


}
