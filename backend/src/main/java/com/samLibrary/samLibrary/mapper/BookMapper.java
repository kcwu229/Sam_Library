package com.samLibrary.samLibrary.mapper;


import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import org.mapstruct.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book toEntity(BookDto bookDto);
    BookDto toDto(Book book);

    Logger logger = LoggerFactory.getLogger(BookMapper.class);

    default BookDto toDtoWithLogging(Book book) {
        BookDto bookDto = toDto(book);
        logger.info("Mapped Book entity to BookDto: {}", bookDto);
        return bookDto;
    }

    default Book toEntityWithLogging(BookDto bookDto) {
        Book book = toEntity(bookDto);
        logger.info("Mapped BookDto to Book entity: {}", book);
        return book;
    }
}
