package com.samLibrary.samLibrary.service.Impl;


import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;
import com.samLibrary.samLibrary.mapper.AuthorMapper;
import com.samLibrary.samLibrary.repository.AuthorRepository;
import com.samLibrary.samLibrary.service.AuthorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;


    @Override
    public AuthorDto createAuthor(AuthorDto authorDto) {
        Author author = AuthorMapper.mapToAuthorEntity(authorDto);
        Author saveAuthor = authorRepository.save(author);
        return AuthorMapper.mappToAuthorDto(saveAuthor);

    }

    @Override
    public AuthorDto getAuthorById(UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        return AuthorMapper.mappToAuthorDto(author);
    }

    @Override
    public AuthorDto updateAuthor(AuthorDto authorToUpdate, UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        author.setBirthYear(authorToUpdate.getBirthYear());
        author.setDeathYear(authorToUpdate.getDeathYear());
        author.setCountry(authorToUpdate.getCountry());
        author.setName(authorToUpdate.getName());
        author.setDescription(authorToUpdate.getDescription());

        // need to rewrite this part
        author.setImageUrl(authorToUpdate.getImageUrl());
        return null;
    }

    @Override
    public void deleteAuthor(UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        authorRepository.deleteById(authorId);
    }
}
