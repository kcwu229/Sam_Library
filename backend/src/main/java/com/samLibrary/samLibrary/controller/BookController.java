package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.service.BookService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<BookDto> createBook(
            @RequestPart("book") @Valid BookDto bookDto,
            @RequestPart("file") @Valid MultipartFile file
    ) {
        BookDto savedBook = bookService.createBook(bookDto, file);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") String bookId) {
        BookDto BookDto = bookService.getBookById(bookId);
        return ResponseEntity.ok(BookDto);
    }


    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        List<String> categories = bookService.getAllCategories();
       return ResponseEntity.ok(books);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = bookService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // for seach function
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam String searchField,
            @RequestParam String searchText
    ) {
        searchText = searchText.toLowerCase();
        try {
            List<BookDto> books = bookService.searchBooks(searchField, searchText);
            return ResponseEntity.ok(books);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateBook(
            @RequestPart("book") BookDto updatedBook,
            @PathVariable("id") String bookId,
            @RequestPart("file") @Valid MultipartFile file) {
        BookDto bookDto = bookService.updateBook(updatedBook, bookId, file);
        return ResponseEntity.ok(bookDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") String bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
