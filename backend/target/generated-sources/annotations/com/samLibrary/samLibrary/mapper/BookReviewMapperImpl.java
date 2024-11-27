package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-28T03:26:12+0800",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241023-1306, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class BookReviewMapperImpl implements BookReviewMapper {

    @Override
    public BookReview toEntity(BookReviewDto bookReviewDto) {
        if ( bookReviewDto == null ) {
            return null;
        }

        BookReview bookReview = new BookReview();

        bookReview.setCreateTimestamp( bookReviewDto.getCreateTimestamp() );
        bookReview.setEditTimestamp( bookReviewDto.getEditTimestamp() );
        bookReview.setId( bookReviewDto.getId() );
        bookReview.setRating( bookReviewDto.getRating() );
        bookReview.setReview( bookReviewDto.getReview() );
        bookReview.setTitle( bookReviewDto.getTitle() );
        bookReview.setUserId( bookReviewDto.getUserId() );

        return bookReview;
    }

    @Override
    public BookReviewDto toDto(BookReview bookReview) {
        if ( bookReview == null ) {
            return null;
        }

        BookReviewDto bookReviewDto = new BookReviewDto();

        bookReviewDto.setCreateTimestamp( bookReview.getCreateTimestamp() );
        bookReviewDto.setEditTimestamp( bookReview.getEditTimestamp() );
        bookReviewDto.setId( bookReview.getId() );
        bookReviewDto.setRating( bookReview.getRating() );
        bookReviewDto.setReview( bookReview.getReview() );
        bookReviewDto.setTitle( bookReview.getTitle() );
        bookReviewDto.setUserId( bookReview.getUserId() );

        return bookReviewDto;
    }
}
