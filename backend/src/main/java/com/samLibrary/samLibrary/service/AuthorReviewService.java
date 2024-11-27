package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;

import java.util.List;

public interface AuthorReviewService {
    AuthorReviewDto createAuthorReview(AuthorReviewDto AuthorReviewDto, String authorId);
    AuthorReviewDto getAuthorReviewById(String AuthorReviewId);
    AuthorReviewDto updateAuthorReview(AuthorReviewDto AuthorReviewDto, String authorReviewId);
    void deleteAuthorReview(String AuthorReviewId);
    List<AuthorReviewDto> getAllAuthorReviews(String AuthorId);
}
