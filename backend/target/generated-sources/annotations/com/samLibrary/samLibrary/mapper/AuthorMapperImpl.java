package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-27T15:21:02+0800",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class AuthorMapperImpl implements AuthorMapper {

    @Override
    public Author toEntity(AuthorDto authorDto) {
        if ( authorDto == null ) {
            return null;
        }

        String id = null;
        String name = null;
        String country = null;
        int birthYear = 0;
        int deathYear = 0;
        String imageName = null;
        String description = null;
        String catchPhrase = null;

        Author author = new Author( id, name, country, birthYear, deathYear, imageName, description, catchPhrase );

        return author;
    }

    @Override
    public AuthorDto toDto(Author author) {
        if ( author == null ) {
            return null;
        }

        AuthorDto authorDto = new AuthorDto();

        return authorDto;
    }
}
