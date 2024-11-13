package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.UserDto;

import java.util.UUID;

public interface UserService {
    AuthorDto createAuthor(UserDto userDto);
    AuthorDto getAuthorById(UUID userId);
    AuthorDto updateAuthor(UserDto userDto, UUID userId);
    void deleteAuthor(UUID userId);
}
