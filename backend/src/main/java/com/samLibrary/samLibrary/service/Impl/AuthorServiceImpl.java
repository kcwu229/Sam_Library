package com.samLibrary.samLibrary.service.Impl;


import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.entity.Author;
import com.samLibrary.samLibrary.mapper.AuthorMapper;
import com.samLibrary.samLibrary.repository.AuthorRepository;
import com.samLibrary.samLibrary.service.AuthorService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private AuthorRepository authorRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthorServiceImpl.class);


    @Override
    public AuthorDto createAuthor(AuthorDto authorDto, MultipartFile file) {

        UUID authorId = UUID.randomUUID();
        String fileName = authorId.toString();

        logger.info("authorId is :" + authorId);
        logger.info("filename is :" + fileName);

        try {
            // Read the input file as a BufferedImage
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

            // Save the BufferedImage as a PNG file
            ImageIO.write(bufferedImage, "png", Files.newOutputStream(Paths.get("backend/images/authors/" + fileName + ".png")));
            //logger.info("File uploaded and converted to PNG successfully");
        } catch (IOException e) {
            logger.error("Error uploading and converting file", e);
        }


        Author author = new Author();
        author.setId(authorId);
        author.setName(authorDto.getName());
        author.setCountry(author.getCountry());
        author.setBirthYear(author.getBirthYear());
        author.setDeathYear(author.getDeathYear());
        author.setDescription(author.getDescription());
        author.setImageName(fileName);



        // Save the author entity to the database
        Author savedAuthor = authorRepository.save(author);

        // Convert the saved author entity back to a authorDto
        return AuthorMapper.mappToAuthorDto(savedAuthor);

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
        author.setImageName(authorToUpdate.getImageName());
        return null;
    }

    @Override
    public void deleteAuthor(UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        authorRepository.deleteById(authorId);
    }

    @Override
    public List<AuthorDto> getAllAuthors() {
        return authorRepository.findAll().stream()
                .map(AuthorMapper::mappToAuthorDto)
                .collect(Collectors.toList());
    }
}
