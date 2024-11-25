package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.entity.AuthorReview;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorReviewMapper {
    AuthorReview toEntity(AuthorReviewDto authorReviewDto);
    AuthorReviewDto toDto(AuthorReview authorReview);

}
