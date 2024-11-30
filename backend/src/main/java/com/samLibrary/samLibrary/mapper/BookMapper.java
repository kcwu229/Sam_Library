package com.samLibrary.samLibrary.mapper;


import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public class BookMapper {

    public Book toEntity(BookDto bookDto) {
        if (bookDto == null) {
            return null;
        }

        Book book = new Book();
        book.setId(bookDto.getId());
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublishedDate(bookDto.getPublishedDate());
        book.setPublisher(bookDto.getPublisher());
        book.setCategory(bookDto.getCategory());
        book.setImage(bookDto.getImage());
        book.setIsbn(bookDto.getIsbn());
        book.setCatchPhrase(bookDto.getCatchPhrase());
        book.setBookDescription(bookDto.getBookDescription());

        return book;
    }

    public BookDto toDto(Book book) {
        if (book == null) {
            return null;
        }

        BookDto bookDto = new BookDto();
        bookDto.setId(book.getId());
        bookDto.setTitle(book.getTitle());
        bookDto.setAuthor(book.getAuthor());
        bookDto.setPublishedDate(book.getPublishedDate());
        bookDto.setPublisher(book.getPublisher());
        bookDto.setCategory(book.getCategory());
        bookDto.setImage(book.getImage());
        bookDto.setIsbn(book.getIsbn());
        bookDto.setCatchPhrase(book.getCatchPhrase());
        bookDto.setBookDescription(book.getBookDescription());

        return bookDto;
    }
}
