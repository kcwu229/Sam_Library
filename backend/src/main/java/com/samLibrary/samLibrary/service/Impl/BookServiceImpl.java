package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.mapper.BookMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
    private BookMapper bookMapper;


    public BookDto createBook(BookDto bookDto, MultipartFile file) {
        // Handle image upload
        String bookId = UUID.randomUUID().toString();
        String fileName = bookId.toString();

        logger.info("bookId is :" + bookId);
        logger.info("filename is :" + fileName);

        try {
            // Get the original file size
            long originalFileSize = file.getSize();
            logger.info("Original file size: " + originalFileSize + " bytes");

            // Copy the file directly
            Path destinationPath = Paths.get("backend/images/books/" + fileName + ".png");
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

        Book book = new Book();
        book.setId(bookId); // Ensure the String is set here
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublishedDate(bookDto.getPublishedDate());
        book.setPublisher(bookDto.getPublisher());
        book.setCategory(bookDto.getCategory());
        book.setImage(fileName);
        book.setIsbn(bookDto.getIsbn());
        book.setCatchPhrase(bookDto.getCatchPhrase());
        book.setBookDescription(bookDto.getBookDescription());

        Book savedBook = bookRepository.save(book);
        // Convert the saved Book entity back to a BookDto
        return bookMapper.toDto(savedBook);

    }

    @Override
    public BookDto getBookById(String bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        return bookMapper.toDto(book);
    }


    public BookDto updateBook(BookDto bookToBeUpdated, String bookId, MultipartFile file) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );

        // if the user uploads a new image, delete the old image and save the new one
        String fileName = book.getImage();
        logger.info("bookId is :" + bookId);
        logger.info("filename is :" + fileName);

        // new handling for image that not from external api
        try {
            if (!fileName.startsWith("http")) {
            Path destinationPath = Paths.get("backend/images/books/" + fileName + ".png");
            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
            }
            else {
                fileName = bookToBeUpdated.getImage();
                Path destinationPath = Paths.get("backend/images/books/" + fileName + ".png");
                Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            logger.error("Error uploading and copying file", e);
        }

        book.setTitle(bookToBeUpdated.getTitle());
        book.setAuthor(bookToBeUpdated.getAuthor());
        book.setPublishedDate(bookToBeUpdated.getPublishedDate());
        book.setPublisher(bookToBeUpdated.getPublisher());

        if (!fileName.startsWith("http")) {
            book.setImage(fileName);
        }
        else {
            book.setImage(bookToBeUpdated.getImage());
        }
        book.setCategory(bookToBeUpdated.getCategory());
        book.setIsbn(bookToBeUpdated.getIsbn());
        book.setCatchPhrase(bookToBeUpdated.getCatchPhrase());
        book.setBookDescription(bookToBeUpdated.getBookDescription());
        Book savedBook = bookRepository.save(book);
        // Convert the saved Book entity back to a BookDto
        return bookMapper.toDto(savedBook);
    }

    @Override
    @Cacheable(value = "books")
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        if (books == null) {
            logger.warn("No books found");
        } else {
            logger.info("Found {} books", books.size());
        }
        return books.stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllCategories() {
        return bookRepository.findAllCategories();
    }

    @Override
    public List<BookDto> searchBooks(String searchField, String searchText) {

        List<Book> searchedBooks;

        if ("all".equals(searchField)) {
            searchedBooks = bookRepository.searchBooksByAllFields(searchText);
        }
        else{
            searchedBooks = bookRepository.searchBooksByField(searchField,searchText);
            //
        }
        return searchedBooks.stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBook(String bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        // Delete the image file associated with the book
        String imagePath = "backend/images/books/" + book.getImage() + ".png";

        try {
            Files.deleteIfExists(Paths.get(imagePath));
            logger.info("Image file deleted successfully: " + imagePath);
        } catch (IOException e) {
            logger.error("Error deleting image file: " + imagePath, e);
        }

        bookRepository.deleteById(bookId);
    }
}
