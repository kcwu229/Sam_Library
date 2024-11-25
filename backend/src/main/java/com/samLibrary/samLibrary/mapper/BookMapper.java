package com.samLibrary.samLibrary.mapper;


import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book toEntity(BookDto bookDto);
    BookDto toDto(Book book);
}
