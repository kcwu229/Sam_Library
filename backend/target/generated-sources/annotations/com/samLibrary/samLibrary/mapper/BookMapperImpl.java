package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-28T00:26:52+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book toEntity(BookDto bookDto) {
        if ( bookDto == null ) {
            return null;
        }

        String id = null;
        String title = null;
        String category = null;
        String author = null;
        String publishedDate = null;
        String image = null;
        String publisher = null;
        String isbn = null;
        String bookDescription = null;
        String catchPhrase = null;

        Book book = new Book( id, title, category, author, publishedDate, image, publisher, isbn, bookDescription, catchPhrase );

        return book;
    }

    @Override
    public BookDto toDto(Book book) {
        if ( book == null ) {
            return null;
        }

        BookDto bookDto = new BookDto();

        return bookDto;
    }
}
