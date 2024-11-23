package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.service.JWTService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JWTServiceImpl implements JWTService {
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
    private String secretKey = "";


    private Key getKey() {
        // Generate a secret key if it doesn't exist
        if (secretKey.isEmpty()) {
            generateSecretKey();
        }
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generate a secret key
    public String generateSecretKey() {
        try {KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
                SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        }

        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return secretKey;
    }

    @Override
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        logger.info("Key: " + getKey());

        String token = Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() +  60 * 60 * 30))
                .signWith(getKey())
                .compact();

        logger.info("Token generated: " + token);

        return token;
    }
}