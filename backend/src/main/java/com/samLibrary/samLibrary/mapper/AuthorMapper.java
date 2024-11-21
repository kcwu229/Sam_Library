package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;

public class AuthorMapper {
    // Add the mapToAuthorDto method
    public static AuthorDto mappToAuthorDto(Author author) {
        return new AuthorDto(
                author.getId(),
                author.getName(),
                author.getBirthYear(),
                author.getCountry(),
                author.getDeathYear(),
                author.getImageName(),
                author.getCatchPhrase(),
                author.getDescription()
        );
    }

    // Add the mapToAuthorEntity method
    public static Author mapToAuthorEntity(AuthorDto authorDto) {
        return new Author(
                authorDto.getId(),
                authorDto.getName(),
                authorDto.getCatchPhrase(),
                authorDto.getBirthYear(),
                authorDto.getDeathYear(),
                authorDto.getCountry(),
                authorDto.getImageName(),
                authorDto.getDescription()
        );
    }
}
