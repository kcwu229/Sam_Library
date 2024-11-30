package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public class BookReviewMapper {

    public BookReview toEntity(BookReviewDto dto) {
        if (dto == null) {
            return null;
        }

        BookReview bookReview = new BookReview();
        bookReview.setId(dto.getId());
        Book book = new Book();
        bookReview.setBook(book);
        bookReview.setTitle(dto.getTitle());
        bookReview.setReview(dto.getReview());
        bookReview.setUserId(dto.getUserId());
        bookReview.setRating(dto.getRating());
        bookReview.setCreateTimestamp(dto.getCreateTimestamp());
        bookReview.setEditTimestamp(dto.getEditTimestamp());

        return bookReview;
    }


    public BookReviewDto toDto(BookReview entity) {
        if (entity == null) {
            return null;
        }

        BookReviewDto bookReviewDto = new BookReviewDto();
        bookReviewDto.setId(entity.getId());
        bookReviewDto.setBookId(entity.getBook().getId());
        bookReviewDto.setTitle(entity.getTitle());
        bookReviewDto.setReview(entity.getReview());
        bookReviewDto.setUserId(entity.getUserId());
        bookReviewDto.setRating(entity.getRating());
        bookReviewDto.setCreateTimestamp(entity.getCreateTimestamp());
        bookReviewDto.setEditTimestamp(entity.getEditTimestamp());

        return bookReviewDto;
    }
}