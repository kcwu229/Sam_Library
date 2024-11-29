package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookReviewMapper {
    @Mapping(target = "book.id", source = "bookId")
    BookReview toEntity(BookReviewDto bookReviewDto);

    @Mapping(target = "bookId", source = "book.id")
    BookReviewDto toDto(BookReview bookReview);
}
