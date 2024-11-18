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
            // Read the input file as a BufferedImage
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

            // Save the BufferedImage as a PNG file
            ImageIO.write(bufferedImage, "png", Files.newOutputStream(Paths.get("backend/images/" + fileName + ".png")));
            //logger.info("File uploaded and converted to PNG successfully");
        } catch (IOException e) {
            logger.error("Error uploading and converting file", e);
        }
        // Create a new Book entity from the BookDto
        Book book = new Book();
        book.setId(bookId);
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublishedYear(bookDto.getPublishedYear());
        book.setImageName(fileName);
        book.setIsbn(bookDto.getIsbn());
        book.setBookDescription(bookDto.getBookDescription());

        // Save the Book entity to the database
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

    @Override
    public BookDto updateBook(BookDto bookToBeUpdated, UUID bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        book.setAuthor(bookToBeUpdated.getAuthor());
        book.setImageName(bookToBeUpdated.getImageName());
        book.setIsbn(bookToBeUpdated.getIsbn());
        book.setTitle(bookToBeUpdated.getTitle());
        book.setPublishedYear(bookToBeUpdated.getPublishedYear());
        book.setBookDescription(bookToBeUpdated.getBookDescription());
        Book updatedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(updatedBook);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(book -> {
                    BookDto bookDto = BookMapper.mapToBookDto(book);
                    Path path = Paths.get("backend/" + book.getImageName() + ".png");
                    bookDto.setImageUrl("backend/" + book.getImageName() + ".png"); // Set the image URL

                    return bookDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBook(UUID bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        bookRepository.deleteById(bookId);
    }
}
