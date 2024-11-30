package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-30T13:07:48+0800",
    comments = "version: 1.5.2.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241112-1021, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book toEntity(BookDto bookDto) {
        if ( bookDto == null ) {
            return null;
        }

        Book book = new Book();

        book.setAuthor( bookDto.getAuthor() );
        book.setBookDescription( bookDto.getBookDescription() );
        book.setCatchPhrase( bookDto.getCatchPhrase() );
        book.setCategory( bookDto.getCategory() );
        book.setId( bookDto.getId() );
        book.setImage( bookDto.getImage() );
        book.setIsbn( bookDto.getIsbn() );
        book.setPublishedDate( bookDto.getPublishedDate() );
        book.setPublisher( bookDto.getPublisher() );
        book.setTitle( bookDto.getTitle() );

        return book;
    }

    @Override
    public BookDto toDto(Book book) {
        if ( book == null ) {
            return null;
        }

        BookDto bookDto = new BookDto();

        bookDto.setAuthor( book.getAuthor() );
        bookDto.setBookDescription( book.getBookDescription() );
        bookDto.setCatchPhrase( book.getCatchPhrase() );
        bookDto.setCategory( book.getCategory() );
        bookDto.setId( book.getId() );
        bookDto.setImage( book.getImage() );
        bookDto.setIsbn( book.getIsbn() );
        bookDto.setPublishedDate( book.getPublishedDate() );
        bookDto.setPublisher( book.getPublisher() );
        bookDto.setTitle( book.getTitle() );

        return bookDto;
    }
}
