package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.dto.BookReviewResponse;
import com.samLibrary.samLibrary.service.BookReviewService;
import com.samLibrary.samLibrary.service.Impl.BookServiceImpl;
import com.samLibrary.samLibrary.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/books-reviews")
public class BookReviewController {

    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
    private BookReviewService bookReviewService;
    private UserService userService;

    @PostMapping("/{id}")
    public ResponseEntity<BookReviewDto> createBookReview(
            @Valid @RequestBody BookReviewDto bookReviewDto,
            @PathVariable("id") String bookId,
            @RequestParam("username") String username)
    {
        if (bookReviewDto.getTitle() == null || bookReviewDto.getTitle().isBlank()) {
            return ResponseEntity.badRequest().body(null);
        }
        BookReviewDto savedBookReview = bookReviewService.createBookReview(bookReviewDto, bookId, username);
        return new ResponseEntity<>(savedBookReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReviewDto> getAuthorById(@PathVariable("id") String bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.getBookReviewById(bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @GetMapping("/all/{bookId}")
    public ResponseEntity<List<BookReviewResponse>> getAllBookReview(@PathVariable String bookId) {
        logger.info("THE BOOK ID IS : {}", bookId);
        List<BookReviewResponse> bookReviewResponses= bookReviewService.findBookReviewResponseByBookId(bookId);
        logger.info("ttttest : {}", bookReviewResponses);
        return ResponseEntity.ok(bookReviewResponses);

    }

    @PutMapping("{id}")
    public ResponseEntity<BookReviewDto> updateReview(@RequestBody BookReviewDto updatedBookReview, @PathVariable("id") String bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.updateBookReview(updatedBookReview, bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReview(
            @Valid @RequestBody String bookReviewId,
            @PathVariable("id") String bookId) {
        bookReviewService.deleteBookReview(bookReviewId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
