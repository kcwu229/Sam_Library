package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.BookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface BookService {
    BookDto createBook(BookDto bookDto, MultipartFile file);
    BookDto getBookById(UUID bookId);
    BookDto updateBook(BookDto bookToBeUpdated, UUID bookId, MultipartFile file);
    void deleteBook(UUID bookId);
    List<BookDto> getAllBooks();
    List<String> getAllCategories();
    List<BookDto> searchBooks(String searchField, String searchText);
}
