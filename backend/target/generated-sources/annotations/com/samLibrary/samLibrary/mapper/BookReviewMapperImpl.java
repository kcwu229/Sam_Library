package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-29T05:59:59+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class BookReviewMapperImpl implements BookReviewMapper {

    @Override
    public BookReview toEntity(BookReviewDto bookReviewDto) {
        if ( bookReviewDto == null ) {
            return null;
        }

        String id = null;
        Book book = null;
        String title = null;
        String review = null;
        int rating = 0;
        String userId = null;

        BookReview bookReview = new BookReview( id, book, title, review, rating, userId );

        return bookReview;
    }

    @Override
    public BookReviewDto toDto(BookReview bookReview) {
        if ( bookReview == null ) {
            return null;
        }

        BookReviewDto bookReviewDto = new BookReviewDto();

        return bookReviewDto;
    }
}
