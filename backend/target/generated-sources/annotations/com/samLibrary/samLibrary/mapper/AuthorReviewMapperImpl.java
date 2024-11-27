package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.entity.AuthorReview;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-27T22:53:59+0800",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241023-1306, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class AuthorReviewMapperImpl implements AuthorReviewMapper {

    @Override
    public AuthorReview toEntity(AuthorReviewDto authorReviewDto) {
        if ( authorReviewDto == null ) {
            return null;
        }

        AuthorReview authorReview = new AuthorReview();

        authorReview.setCreateTimestamp( authorReviewDto.getCreateTimestamp() );
        authorReview.setEditTimestamp( authorReviewDto.getEditTimestamp() );
        if ( authorReviewDto.getId() != null ) {
            authorReview.setId( UUID.fromString( authorReviewDto.getId() ) );
        }
        authorReview.setRating( authorReviewDto.getRating() );
        authorReview.setReview( authorReviewDto.getReview() );
        authorReview.setTitle( authorReviewDto.getTitle() );

        return authorReview;
    }

    @Override
    public AuthorReviewDto toDto(AuthorReview authorReview) {
        if ( authorReview == null ) {
            return null;
        }

        AuthorReviewDto authorReviewDto = new AuthorReviewDto();

        authorReviewDto.setCreateTimestamp( authorReview.getCreateTimestamp() );
        authorReviewDto.setEditTimestamp( authorReview.getEditTimestamp() );
        if ( authorReview.getId() != null ) {
            authorReviewDto.setId( authorReview.getId().toString() );
        }
        authorReviewDto.setRating( authorReview.getRating() );
        authorReviewDto.setReview( authorReview.getReview() );
        authorReviewDto.setTitle( authorReview.getTitle() );

        return authorReviewDto;
    }
}
