package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.dto.BookReviewDto;

import java.util.List;
import java.util.UUID;

public interface BookReviewService {
    BookReviewDto createBookReview(BookReviewDto bookReviewDto, UUID bookId);
    BookReviewDto getBookReviewById(UUID bookReviewId);
    BookReviewDto updateBookReview(BookReviewDto bookReviewDto, UUID bookReviewId);
    void deleteBookReview(UUID bookReviewId);
    List<BookReviewDto> getAllBookReviews(UUID bookId);
}
