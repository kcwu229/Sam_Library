package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookReviewMapper {
    BookReview toEntity(BookReviewDto bookReviewDto);
    BookReviewDto toDto(BookReview bookReview);

}
