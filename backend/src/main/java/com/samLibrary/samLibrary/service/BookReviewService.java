package com.samLibrary.samLibrary.service;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.dto.BookReviewResponse;

import java.util.List;

public interface BookReviewService {
    BookReviewDto createBookReview(BookReviewDto bookReviewDto, String bookId, String username);
    BookReviewDto getBookReviewById(String bookReviewId);
    BookReviewDto updateBookReview(BookReviewDto bookReviewDto, String bookReviewId);
    void deleteBookReview(String bookReviewId);
    List<BookReviewDto> getUserCommentByBookId(String bookId);
    List<BookReviewResponse> findBookReviewResponseByBookId(String bookId);
}
