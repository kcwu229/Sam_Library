package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.dto.BookReviewResponse;

import java.util.List;

public interface BookReviewService {
    BookReviewDto createBookReview(BookReviewDto bookReviewDto, String bookId, String userId);
    BookReviewDto getBookReviewById(String bookReviewId);
    BookReviewDto updateBookReview(BookReviewDto bookReviewDto, String bookReviewId);
    void deleteBookReview(String bookReviewId, String bookId, String userId);
    List<BookReviewDto> getUserCommentByBookId(String bookId);
    List<BookReviewResponse> findBookReviewResponseByBookId(String bookId);
}
