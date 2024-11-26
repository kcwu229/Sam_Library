package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-26T04:42:32+0800",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.40.0.z20241023-1306, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class AuthorMapperImpl implements AuthorMapper {

    @Override
    public Author toEntity(AuthorDto authorDto) {
        if ( authorDto == null ) {
            return null;
        }

        Author author = new Author();

        author.setBirthYear( authorDto.getBirthYear() );
        author.setCatchPhrase( authorDto.getCatchPhrase() );
        author.setCountry( authorDto.getCountry() );
        author.setDeathYear( authorDto.getDeathYear() );
        author.setDescription( authorDto.getDescription() );
        author.setId( authorDto.getId() );
        author.setImageName( authorDto.getImageName() );
        author.setName( authorDto.getName() );

        return author;
    }

    @Override
    public AuthorDto toDto(Author author) {
        if ( author == null ) {
            return null;
        }

        AuthorDto authorDto = new AuthorDto();

        authorDto.setBirthYear( author.getBirthYear() );
        authorDto.setCatchPhrase( author.getCatchPhrase() );
        authorDto.setCountry( author.getCountry() );
        authorDto.setDeathYear( author.getDeathYear() );
        authorDto.setDescription( author.getDescription() );
        authorDto.setId( author.getId() );
        authorDto.setImageName( author.getImageName() );
        authorDto.setName( author.getName() );

        return authorDto;
    }
}
