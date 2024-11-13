package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.BookDto;

import java.util.UUID;

public interface BookService {
    BookDto createBook(BookDto bookDto);
    BookDto getBookById(UUID bookId);
    BookDto updateBook(BookDto bookDto, UUID bookId);
    void deleteBook(UUID bookId);
}
