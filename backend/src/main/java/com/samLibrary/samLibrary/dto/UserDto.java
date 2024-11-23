package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserDto {
    private UUID id;

    @NotBlank(message = "username is required")
    private String username;

    @NotBlank(message = "firstName is required")
    private String firstName;

    @NotBlank(message = "lastName is required")
    private String lastName;

    @NotBlank(message = "password is required")
    private String password;

    private String email;
}
