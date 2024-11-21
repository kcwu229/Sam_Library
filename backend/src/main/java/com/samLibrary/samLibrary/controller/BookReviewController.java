package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.service.BookReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/books-reviews")
public class BookReviewController {

    private BookReviewService bookReviewService;

    @PostMapping("/{id}")
    public ResponseEntity<BookReviewDto> createBookReview(
            @Valid @RequestBody BookReviewDto bookReviewDto,
            @PathVariable("id") UUID bookId) {
        if (bookReviewDto.getTitle() == null || bookReviewDto.getTitle().isBlank()) {
            return ResponseEntity.badRequest().body(null);
        }
        BookReviewDto savedBookReview = bookReviewService.createBookReview(bookReviewDto, bookId);
        return new ResponseEntity<>(savedBookReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReviewDto> getAuthorById(@PathVariable("id") UUID bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.getBookReviewById(bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @GetMapping("/all/{bookId}")
    public ResponseEntity<List<BookReviewDto>> getAllBookReview(@PathVariable UUID bookId) {
        List<BookReviewDto> bookReviewDto = bookReviewService.getAllBookReviews(bookId);
        return ResponseEntity.ok(bookReviewDto);

    }

    @PutMapping("{id}")
    public ResponseEntity<BookReviewDto> updateUser(@RequestBody BookReviewDto updatedBookReview, @PathVariable("id") UUID bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.updateBookReview(updatedBookReview, bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID bookReviewId) {
        bookReviewService.deleteBookReview(bookReviewId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
