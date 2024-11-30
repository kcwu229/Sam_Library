package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-30T13:07:48+0800",
    comments = "version: 1.5.2.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class BookReviewMapperImpl implements BookReviewMapper {

    @Override
    public BookReview toEntity(BookReviewDto dto) {
        if ( dto == null ) {
            return null;
        }

        BookReview bookReview = new BookReview();

        bookReview.setCreateTimestamp( dto.getCreateTimestamp() );
        bookReview.setEditTimestamp( dto.getEditTimestamp() );
        bookReview.setId( dto.getId() );
        bookReview.setRating( dto.getRating() );
        bookReview.setReview( dto.getReview() );
        bookReview.setTitle( dto.getTitle() );
        bookReview.setUserId( dto.getUserId() );

        return bookReview;
    }

    @Override
    public BookReviewDto toDto(BookReview entity) {
        if ( entity == null ) {
            return null;
        }

        BookReviewDto bookReviewDto = new BookReviewDto();

        bookReviewDto.setCreateTimestamp( entity.getCreateTimestamp() );
        bookReviewDto.setEditTimestamp( entity.getEditTimestamp() );
        bookReviewDto.setId( entity.getId() );
        bookReviewDto.setRating( entity.getRating() );
        bookReviewDto.setReview( entity.getReview() );
        bookReviewDto.setTitle( entity.getTitle() );
        bookReviewDto.setUserId( entity.getUserId() );

        return bookReviewDto;
    }
}
