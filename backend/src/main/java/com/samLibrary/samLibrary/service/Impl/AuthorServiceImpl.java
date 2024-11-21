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
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
            // Save the BufferedImage as a PNG file
            Files.copy(file.getInputStream(), Paths.get("backend/images/authors/" + fileName + ".png"));
            logger.info("File uploaded and converted to PNG successfully");
        } catch (IOException e) {
            logger.error("Error uploading and converting file", e);
        }

        Author author = new Author();

        author.setId(authorId);
        author.setName(authorDto.getName());
        author.setBirthYear(authorDto.getBirthYear());
        author.setCatchPhrase(authorDto.getCatchPhrase());
        author.setDeathYear(authorDto.getDeathYear());
        author.setCountry(authorDto.getCountry());
        author.setImageName(fileName);
        author.setDescription(authorDto.getDescription());

        // Save the author entity to the database
        Author savedAuthor = authorRepository.save(author);

        // Convert the saved author entity back to a authorDto
        return AuthorMapper.mappToAuthorDto(savedAuthor);

    }

    @Override
    public AuthorDto getAuthorById(UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Authors not found")
        );
        return AuthorMapper.mappToAuthorDto(author);
    }

    @Override
    public AuthorDto updateAuthor(AuthorDto authorToUpdate, UUID authorId, MultipartFile file) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Authors not found")
        );

        String fileName = author.getImageName();
        logger.info("authorId is :" + authorId);
        logger.info("filename is :" + fileName);

        try {
            // Get the original file size
            long originalFileSize = file.getSize();
            logger.info("Original file size: " + originalFileSize + " bytes");

            // Copy the file directly
            Path destinationPath = Paths.get("backend/images/authors/" + fileName + ".png");
            Files.copy(file.getInputStream(), destinationPath,  StandardCopyOption.REPLACE_EXISTING);
            logger.info("File uploaded successfully");

            // Verify the copied file size
            long copiedFileSize = Files.size(destinationPath);
            logger.info("Copied file size: " + copiedFileSize + " bytes");

            if (originalFileSize != copiedFileSize) {
                logger.warn("File size mismatch: original (" + originalFileSize + " bytes) vs copied (" + copiedFileSize + " bytes)");
            }
        } catch (IOException e) {
            logger.error("Error uploading and copying file", e);
        }

        logger.info("author Id is :" + authorId);
        logger.info("author aaaName is :" + authorToUpdate.getName());
        logger.info("description aa is :" + authorToUpdate.getDescription());
        logger.info("country aaa :" + authorToUpdate.getCountry());
        logger.info("catch phrase aaa :" + authorToUpdate.getCatchPhrase());
        logger.info("birth year is. aaa :" + authorToUpdate.getBirthYear());
        logger.info("death year is aaa :" + authorToUpdate.getDeathYear());

        author.setName(authorToUpdate.getName());
        author.setBirthYear(authorToUpdate.getBirthYear());
        author.setCatchPhrase(authorToUpdate.getCatchPhrase());
        author.setDeathYear(authorToUpdate.getDeathYear());
        author.setCountry(authorToUpdate.getCountry());
        author.setImageName(fileName);
        author.setDescription(authorToUpdate.getDescription());

        // need to rewrite this part
        author.setImageName(authorToUpdate.getImageName());
        return AuthorMapper.mappToAuthorDto(authorRepository.save(author));
    }

    @Override
    public void deleteAuthor(UUID authorId) {
        Author author = authorRepository.findById(authorId).orElseThrow(
                () -> new RuntimeException("Authors not found")
        );

        String imagePath = "backend/images/authors/" + author.getImageName() + ".png";

        try {
            Files.deleteIfExists(Paths.get(imagePath));
            logger.info("Image file deleted successfully: " + imagePath);
        } catch (IOException e) {
            logger.error("Error deleting image file: " + imagePath, e);
        }

        authorRepository.deleteById(authorId);
    }

    @Override
    public List<AuthorDto> getAllAuthors() {
        return authorRepository.findAll().stream()
                .map(AuthorMapper::mappToAuthorDto)
                .collect(Collectors.toList());
    }
}
