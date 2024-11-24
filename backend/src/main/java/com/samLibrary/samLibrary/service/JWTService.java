package com.samLibrary.samLibrary.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.function.Function;

public interface JWTService {
    String extractUserName(String jwtToken);
    boolean validateToken(String jwtToken, Object userDetails);
    String generateToken(String username);
    <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
    boolean isTokenExpired(String token);
    Date extractExipration(String token);

}
