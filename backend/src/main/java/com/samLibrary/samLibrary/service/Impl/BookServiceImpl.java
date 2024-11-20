package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.mapper.BookMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);


    public BookDto createBook(BookDto bookDto, MultipartFile file) {
        // Handle image upload
        UUID bookId = UUID.randomUUID();
        String fileName = bookId.toString();

        logger.info("bookId is :" + bookId);
        logger.info("filename is :" + fileName);

        try {
            Files.copy(file.getInputStream(), Paths.get("backend/images/books/" + fileName + ".png"));
            logger.info("File uploaded successfully");
        } catch (IOException e) {
            logger.error("Error uploading and converting file", e);
        }

        Book book = new Book();
        book.setId(bookId); // Ensure the UUID is set here
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublishedYear(bookDto.getPublishedYear());
        book.setImageName(fileName);
        book.setIsbn(bookDto.getIsbn());
        book.setCatchPhrase(bookDto.getCatchPhrase());
        book.setBookDescription(bookDto.getBookDescription());

        Book savedBook = bookRepository.save(book);
        // Convert the saved Book entity back to a BookDto
        return BookMapper.mapToBookDto(savedBook);

    }

    @Override
    public BookDto getBookById(UUID bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        return BookMapper.mapToBookDto(book);
    }



    public BookDto updateBook(BookDto bookToBeUpdated, UUID bookId, MultipartFile file) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );

        // if the user uploads a new image, delete the old image and save the new one
        String fileName = book.getImageName();
        logger.info("bookId is :" + bookId);
        logger.info("filename is :" + fileName);

        try {
            Files.copy(file.getInputStream(), Paths.get("backend/images/books/" + fileName + ".png"));
            logger.info("File uploaded successfully");
        } catch (IOException e) {
            logger.error("Error uploading and converting file", e);
        }

        logger.info("1");
        book.setTitle(bookToBeUpdated.getTitle());
        logger.info("2");
        book.setAuthor(bookToBeUpdated.getAuthor());
        logger.info("3");
        book.setPublishedYear(bookToBeUpdated.getPublishedYear());
        logger.info("4");
        book.setImageName(fileName);
        logger.info("5");
        book.setIsbn(bookToBeUpdated.getIsbn());
        logger.info("6");
        book.setCatchPhrase(bookToBeUpdated.getCatchPhrase());
        logger.info("7");
        book.setBookDescription(bookToBeUpdated.getBookDescription());

        Book savedBook = bookRepository.save(book);
        // Convert the saved Book entity back to a BookDto
        return BookMapper.mapToBookDto(savedBook);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(book -> {
                    BookDto bookDto = BookMapper.mapToBookDto(book);
                    Path path = Paths.get("backend/" + book.getImageName() + ".png");

                    return bookDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBook(UUID bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        // Delete the image file associated with the book
        String imagePath = "backend/images/books/" + book.getImageName() + ".png";

        try {
            Files.deleteIfExists(Paths.get(imagePath));
            logger.info("Image file deleted successfully: " + imagePath);
        } catch (IOException e) {
            logger.error("Error deleting image file: " + imagePath, e);
        }

        bookRepository.deleteById(bookId);
    }
}
