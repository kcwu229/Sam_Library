package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Data
public class UserDto {
    private String id;

    @NotBlank(message = "username is required")
    private String username;

    @NotBlank(message = "firstName is required")
    private String firstName;

    @NotBlank(message = "lastName is required")
    private String lastName;

    @NotBlank(message = "password is required")
    private String password;

    private String email;

    private String image;

    // Getters and Setters for role
    private Role role; // Add this field

    // Getters and Setters for role
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
