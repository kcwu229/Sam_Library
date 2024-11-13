package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.UserDto;

import java.util.UUID;

public interface UserService {
    UserDto createAuthor(UserDto userDto);
    UserDto getAuthorById(UUID userId);
    UserDto updateAuthor(UserDto userDto, UUID userId);
    void deleteAuthor(UUID userId);
}
