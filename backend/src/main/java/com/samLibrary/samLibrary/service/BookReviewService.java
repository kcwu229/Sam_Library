package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.dto.BookReviewDto;

import java.util.List;

public interface BookReviewService {
    BookReviewDto createBookReview(BookReviewDto bookReviewDto, String bookId);
    BookReviewDto getBookReviewById(String bookReviewId);
    BookReviewDto updateBookReview(BookReviewDto bookReviewDto, String bookReviewId);
    void deleteBookReview(String bookReviewId);
    List<BookReviewDto> getAllBookReviews(String bookId);
}
