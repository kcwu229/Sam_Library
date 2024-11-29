package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-29T15:57:55+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book toEntity(BookDto bookDto) {
        if ( bookDto == null ) {
            return null;
        }

        Book book = new Book();

        book.setId( bookDto.getId() );
        book.setTitle( bookDto.getTitle() );
        book.setAuthor( bookDto.getAuthor() );
        book.setCategory( bookDto.getCategory() );
        book.setPublishedDate( bookDto.getPublishedDate() );
        book.setPublisher( bookDto.getPublisher() );
        book.setImage( bookDto.getImage() );
        book.setIsbn( bookDto.getIsbn() );
        book.setBookDescription( bookDto.getBookDescription() );
        book.setCatchPhrase( bookDto.getCatchPhrase() );

        return book;
    }

    @Override
    public BookDto toDto(Book book) {
        if ( book == null ) {
            return null;
        }

        BookDto bookDto = new BookDto();

        bookDto.setId( book.getId() );
        bookDto.setTitle( book.getTitle() );
        bookDto.setCategory( book.getCategory() );
        bookDto.setAuthor( book.getAuthor() );
        bookDto.setPublishedDate( book.getPublishedDate() );
        bookDto.setImage( book.getImage() );
        bookDto.setIsbn( book.getIsbn() );
        bookDto.setBookDescription( book.getBookDescription() );
        bookDto.setPublisher( book.getPublisher() );
        bookDto.setCatchPhrase( book.getCatchPhrase() );

        return bookDto;
    }
}
