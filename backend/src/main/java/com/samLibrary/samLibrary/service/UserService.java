package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getUserById(String userId);
    UserDto updateUser(UserDto userDto, String userId);
    void deleteUser(String userId);
    List<UserDto> getAllUsers();
    UserDto getUserByUsername(String username);
    UserDto getUserByBookReviewUserId(String UserId);
}
