package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserDto getUserById(UUID userId);
    UserDto updateUser(UserDto userDto, UUID userId);
    void deleteUser(UUID userId);
    List<UserDto> getAllUsers();
    UserDto getUserByUsername(String username);
}
