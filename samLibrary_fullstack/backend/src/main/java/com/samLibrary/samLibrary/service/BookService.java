package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.BookDto;

import java.util.UUID;

public interface BookService {
    AuthorDto createBook(BookDto bookDto);
    AuthorDto getBookById(UUID bookId);
    AuthorDto updateAuthor(BookDto bookDto, UUID bookId);
    void deleteAuthor(UUID bookId);
}
