package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.BookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface BookService {
    BookDto createBook(BookDto bookDto, MultipartFile file);
    BookDto getBookById(UUID bookId);
    BookDto updateBook(BookDto bookDto, UUID bookId);
    void deleteBook(UUID bookId);
    List<BookDto> getAllBooks();
}
