package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface AuthorService {
    AuthorDto createAuthor(AuthorDto authorDto, MultipartFile file);
    AuthorDto getAuthorById(UUID authorId);
    AuthorDto updateAuthor(AuthorDto authorDto, UUID authorId);
    void deleteAuthor(UUID authorId);
    List<AuthorDto> getAllAuthors();
}
