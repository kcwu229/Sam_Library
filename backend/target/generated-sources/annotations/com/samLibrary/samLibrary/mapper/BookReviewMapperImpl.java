package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-29T23:33:07+0800",
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

        bookReview.setBook( bookReviewDtoToBook( bookReviewDto ) );
        bookReview.setId( bookReviewDto.getId() );
        bookReview.setTitle( bookReviewDto.getTitle() );
        bookReview.setReview( bookReviewDto.getReview() );
        bookReview.setRating( bookReviewDto.getRating() );
        bookReview.setCreateTimestamp( bookReviewDto.getCreateTimestamp() );
        bookReview.setEditTimestamp( bookReviewDto.getEditTimestamp() );
        bookReview.setUserId( bookReviewDto.getUserId() );

        return bookReview;
    }

    @Override
    public BookReviewDto toDto(BookReview bookReview) {
        if ( bookReview == null ) {
            return null;
        }

        BookReviewDto bookReviewDto = new BookReviewDto();

        bookReviewDto.setBookId( bookReviewBookId( bookReview ) );
        bookReviewDto.setId( bookReview.getId() );
        bookReviewDto.setTitle( bookReview.getTitle() );
        bookReviewDto.setReview( bookReview.getReview() );
        bookReviewDto.setUserId( bookReview.getUserId() );
        bookReviewDto.setRating( bookReview.getRating() );
        bookReviewDto.setCreateTimestamp( bookReview.getCreateTimestamp() );
        bookReviewDto.setEditTimestamp( bookReview.getEditTimestamp() );

        return bookReviewDto;
    }

    protected Book bookReviewDtoToBook(BookReviewDto bookReviewDto) {
        if ( bookReviewDto == null ) {
            return null;
        }

        Book book = new Book();

        book.setId( bookReviewDto.getBookId() );

        return book;
    }

    private String bookReviewBookId(BookReview bookReview) {
        if ( bookReview == null ) {
            return null;
        }
        Book book = bookReview.getBook();
        if ( book == null ) {
            return null;
        }
        String id = book.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
