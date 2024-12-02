package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.BookDetailResponse;
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
            @RequestParam("userId") String userId)
    {
        logger.info("controller Creating book review for bookId: {} and userId: {}", bookId, userId);
        BookReviewDto savedBookReview = bookReviewService.createBookReview(bookReviewDto, bookId, userId);
        return new ResponseEntity<>(savedBookReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReviewDto> getAuthorById(@PathVariable("id") String bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.getBookReviewById(bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @GetMapping("/all/{bookId}")
    public ResponseEntity<BookDetailResponse> getAllBookReview(@PathVariable String bookId) {
        logger.info("THE BOOK ID IS : {}", bookId);
        BookDetailResponse bookDetailResponse= bookReviewService.findBookReviewResponseByBookId(bookId);
        logger.info("ttttest : {}", bookDetailResponse);
        return ResponseEntity.ok(bookDetailResponse);

    }

    @PutMapping("{id}")
    public ResponseEntity<BookReviewDto> updateReview(@RequestBody BookReviewDto updatedBookReview, @PathVariable("id") String bookReviewId) {
        BookReviewDto bookReviewDto = bookReviewService.updateBookReview(updatedBookReview, bookReviewId);
        return ResponseEntity.ok(bookReviewDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReview(
            @RequestParam("bookReviewId") String bookReviewId,
            @PathVariable("id") String bookId,
            @RequestParam("userId") String userId
            ){
        bookReviewService.deleteBookReview(bookReviewId, bookId, userId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
