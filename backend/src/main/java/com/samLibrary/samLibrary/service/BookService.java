package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.BookDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto, MultipartFile file);
    BookDto getBookById(String bookId);
    BookDto updateBook(BookDto bookToBeUpdated, String bookId, MultipartFile file);
    void deleteBook(String bookId);
    List<BookDto> getAllBooks();
    List<String> getAllCategories();
    List<BookDto> searchBooks(String searchField, String searchText);
}
