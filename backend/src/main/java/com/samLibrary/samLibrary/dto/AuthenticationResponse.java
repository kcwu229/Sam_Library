package com.samLibrary.samLibrary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.samLibrary.samLibrary.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("userId")
    private UUID id;

    @JsonProperty("role")
    private Role role;

    @JsonProperty("refresh_token")
    private String refreshToken;
}
