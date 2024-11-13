package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;

public class BookReviewMapper {
    public static BookReviewDto mapToBookReviewDto(BookReview bookReview) {
        return new BookReviewDto(
            bookReview.getId(),
            bookReview.getBook().getId(),
            bookReview.getReview(),
            bookReview.getRating(),
            bookReview.getBook()
        );
    }

    public static BookReview mapToBookReviewEntity(BookReviewDto bookReviewDto, Book book) {
        return new BookReview(
                bookReviewDto.getId(),
                bookReviewDto.getBookId(),
                book,
                bookReviewDto.getReview(),
                bookReviewDto.getRating()
        );
    }
}
