package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> createAuthor(@RequestBody BookDto bookDto) {
        BookDto savedAuthor = bookService.createBook(bookDto);
        return new ResponseEntity<>(savedAuthor, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getAuthorById(@PathVariable UUID bookId) {
        BookDto BookDto = bookService.getBookById(bookId);
        return ResponseEntity.ok(BookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllUsers() {
        List<BookDto> authors = bookService.getAllBooks();
        return ResponseEntity.ok(authors);

    }

    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateUser(@RequestBody BookDto updatedBook, @PathVariable("id") UUID bookId) {
        BookDto bookDto = bookService.updateBook(updatedBook, bookId);
        return ResponseEntity.ok(bookDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
