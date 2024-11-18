package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;

import java.util.List;
import java.util.UUID;

public interface AuthorService {
    AuthorDto createAuthor(AuthorDto authorDto);
    AuthorDto getAuthorById(UUID authorId);
    AuthorDto updateAuthor(AuthorDto authorDto, UUID authorId);
    void deleteAuthor(UUID authorId);
    List<AuthorDto> getAllAuthors();
}
