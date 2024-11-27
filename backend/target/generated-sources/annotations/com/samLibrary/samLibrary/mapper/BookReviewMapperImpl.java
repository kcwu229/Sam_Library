package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-27T15:21:02+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class BookReviewMapperImpl implements BookReviewMapper {

    @Override
    public BookReview toEntity(BookReviewDto bookReviewDto) {
        if ( bookReviewDto == null ) {
            return null;
        }

        BookReview bookReview = new BookReview();

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
