package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Role;
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

    private String username;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

}
