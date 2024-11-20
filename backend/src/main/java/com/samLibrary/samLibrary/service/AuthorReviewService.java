package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;

import java.util.List;
import java.util.UUID;

public interface AuthorReviewService {
    AuthorReviewDto createAuthorReview(AuthorReviewDto AuthorReviewDto, UUID authorId);
    AuthorReviewDto getAuthorReviewById(UUID AuthorReviewId);
    AuthorReviewDto updateAuthorReview(AuthorReviewDto AuthorReviewDto, UUID authorReviewId);
    void deleteAuthorReview(UUID AuthorReviewId);
    List<AuthorReviewDto> getAllAuthorReviews(UUID AuthorId);
}
