package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;

public class BookMapper {

    // Add the mapToBookDto method
    public static BookDto mapToBookDto(Book book) {
        return new BookDto(
            book.getId(),
            book.getTitle(),
            book.getAuthor(),
            book.getPublishedYear(),
            book.getImageName(),
            book.getIsbn(),
                book.getBookDescription(),
                book.getCatchPhrase()
        );
    }

    // Add the mapToBookEntity method
    public static Book mapToBookEntity(BookDto bookDto) {
        return new Book(
            bookDto.getId(),
            bookDto.getTitle(),
            bookDto.getAuthor(),
            bookDto.getPublishedYear(),
            bookDto.getImageName(),
            bookDto.getIsbn(),
                bookDto.getBookDescription(),
                bookDto.getCatchPhrase()

        );
    }
}
