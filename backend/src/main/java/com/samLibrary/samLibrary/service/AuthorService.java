package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuthorService {
    AuthorDto createAuthor(AuthorDto authorDto, MultipartFile file);
    AuthorDto getAuthorById(String authorId);
    AuthorDto updateAuthor(AuthorDto authorToBeUpdated, String authorId,MultipartFile file);
    void deleteAuthor(String authorId);
    List<AuthorDto> getAllAuthors();
}
