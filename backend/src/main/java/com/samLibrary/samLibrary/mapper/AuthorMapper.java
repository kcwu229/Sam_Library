package com.samLibrary.samLibrary.mapper;


import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    Author toEntity(AuthorDto authorDto);
    AuthorDto toDto(Author author);
}
