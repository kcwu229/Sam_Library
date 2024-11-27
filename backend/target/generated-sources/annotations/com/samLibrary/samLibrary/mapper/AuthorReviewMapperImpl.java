package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.entity.AuthorReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-27T15:21:02+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class AuthorReviewMapperImpl implements AuthorReviewMapper {

    @Override
    public AuthorReview toEntity(AuthorReviewDto authorReviewDto) {
        if ( authorReviewDto == null ) {
            return null;
        }

        AuthorReview authorReview = new AuthorReview();

        return authorReview;
    }

    @Override
    public AuthorReviewDto toDto(AuthorReview authorReview) {
        if ( authorReview == null ) {
            return null;
        }

        AuthorReviewDto authorReviewDto = new AuthorReviewDto();

        return authorReviewDto;
    }
}
