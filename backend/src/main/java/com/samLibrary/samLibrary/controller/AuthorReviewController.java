package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.service.AuthorReviewService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/authors-reviews")
public class AuthorReviewController {

    private AuthorReviewService AuthorReviewService;

    @PostMapping("/{id}")
    public ResponseEntity<AuthorReviewDto> createAuthorReview(
            @Valid @RequestBody AuthorReviewDto authorReviewDto,
            @PathVariable("id") String authorId) {
        AuthorReviewDto savedAuthorReview = AuthorReviewService.createAuthorReview(authorReviewDto, authorId);
        return new ResponseEntity<>(savedAuthorReview, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorReviewDto> getAuthorById(@PathVariable("id") String AuthorReviewId) {
        AuthorReviewDto AuthorReviewDto = AuthorReviewService.getAuthorReviewById(AuthorReviewId);
        return ResponseEntity.ok(AuthorReviewDto);
    }

    @GetMapping("/all/{authorId}")
    public ResponseEntity<List<AuthorReviewDto>> getAllAuthorReview(@PathVariable String authorId) {
        List<AuthorReviewDto> AuthorReviewDto = AuthorReviewService.getAllAuthorReviews(authorId);
        return ResponseEntity.ok(AuthorReviewDto);

    }

    @PutMapping("{id}")
    public ResponseEntity<AuthorReviewDto> updateUser(@RequestBody AuthorReviewDto updatedAuthorReview, @PathVariable("id") String AuthorReviewId , @PathVariable("authorId") String authorId) {
        AuthorReviewDto AuthorReviewDto = AuthorReviewService.updateAuthorReview(updatedAuthorReview, authorId);
        return ResponseEntity.ok(AuthorReviewDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String AuthorReviewId) {
        AuthorReviewService.deleteAuthorReview(AuthorReviewId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
