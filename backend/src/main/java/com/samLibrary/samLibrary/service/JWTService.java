package com.samLibrary.samLibrary.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.function.Function;

public interface JWTService {
    String generateToken(String username);

    String extractUserName(String token);

    boolean validateToken(String token, UserDetails userDetails);

}
