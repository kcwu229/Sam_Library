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
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") UUID bookId) {
        BookDto BookDto = bookService.getBookById(bookId);
        return ResponseEntity.ok(BookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);

    }

    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateBook(@RequestBody BookDto updatedBook, @PathVariable("id") UUID bookId) {
        BookDto bookDto = bookService.updateBook(updatedBook, bookId);
        return ResponseEntity.ok(bookDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") UUID bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
