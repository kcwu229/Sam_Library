package com.samLibrary.samLibrary.service.Impl;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.mapper.BookMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.service.BookService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
    private final BookMapper bookMapper;


    @Value("${gcp.bucket.name}")
    private String bucketName;

    private final String credentialsPath = "config/bucketKey.json"; // Update this path

    public void initializeGoogleCredentials() {
        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream);
            Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            logger.info("Google Cloud Storage credentials initialized successfully.");
        } catch (IOException e) {
            logger.error("Failed to initialize Google Cloud Storage credentials", e);
        }
    }

    public BookDto createBook(BookDto bookDto, MultipartFile file) {
        // Handle image upload

        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream);
            Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            logger.info("Bucket name: " + bucketName);

            try {
                Bucket bucket = storage.get(bucketName);
                if (bucket != null) {
                    logger.info("Successfully connected to the bucket: " + bucketName);
                } else {
                    logger.error("Failed to connect to the bucket: " + bucketName);
                }
            } catch (Exception e) {
                logger.error("Failed to connect to the bucket: " + bucketName, e);
            }

            String bookId = UUID.randomUUID().toString();
            String fileName = bookId;

            String folderName = "images/books/";
            BlobInfo folderBlobInfo = BlobInfo.newBuilder(bucketName, folderName).build();
            storage.create(folderBlobInfo);

            logger.info("Folder created in GCP bucket successfully");

            // Upload the file to the folder
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, folderName + (fileName + ".jpg")).build();
            storage.create(blobInfo, file.getInputStream());
            logger.info("File uploaded to GCP bucket successfully");

            Book book = new Book();
            book.setId(bookId);
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
            return bookMapper.toDto(savedBook);

        } catch (IOException e) {
            logger.error("Error uploading file to GCP bucket", e);
            throw new RuntimeException("Failed to upload file", e);
        }
    }


    @Override
    public BookDto getBookById(String bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        return bookMapper.toDto(book);
    }


    public BookDto updateBook(BookDto bookToBeUpdated, String bookId, MultipartFile file) {
        Storage storage;
        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream);
            storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            logger.info("Google Cloud Storage credentials initialized successfully.");
        } catch (IOException e) {
            logger.error("Failed to initialize Google Cloud Storage credentials", e);
            throw new RuntimeException("Failed to initialize Google Cloud Storage credentials", e);
        }

        // Check if the bucket exists
        Bucket bucket = storage.get(bucketName);
        if (bucket == null) {
            logger.error("Bucket not found: " + bucketName);
            throw new RuntimeException("Bucket not found: " + bucketName);
        }

        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );

        // If the user uploads a new image, delete the old image and save the new one
        String fileName = book.getImage();
        String folderName = "images/books/";
        logger.info("bookId 222 is: " + bookId);
        logger.info("filename 222 is: " + fileName);

        try {
            if (!fileName.startsWith("http")) {
                // Delete the old image from the bucket
                storage.delete(bucketName, "images/books/" + fileName + ".jpg");
            }

            // Upload the new image to the bucket
            fileName = bookId;
            // Upload the file to the folder

            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, folderName + (fileName + ".jpg")).build();
            storage.create(blobInfo, file.getInputStream());
            logger.info("File uploaded to GCP bucket successfully");

            Blob blob = storage.create(blobInfo, file.getInputStream());
            logger.info("File uploaded to GCP bucket successfully");


        } catch (IOException e) {
            logger.error("Error uploading and copying file", e);
            throw new RuntimeException("Failed to upload file", e);
        }

        book.setTitle(bookToBeUpdated.getTitle());
        book.setAuthor(bookToBeUpdated.getAuthor());
        book.setImage(fileName);
        book.setPublishedDate(bookToBeUpdated.getPublishedDate());
        book.setPublisher(bookToBeUpdated.getPublisher());
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

        List<BookDto> bookDtos = books.stream()
                .map(book -> {
                    BookDto bookDto = bookMapper.toDto(book);
                    return bookDto;
                })
                .collect(Collectors.toList());

        return bookDtos;
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

        Storage storage;
        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccountStream);
            storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
            logger.info("Google Cloud Storage credentials initialized successfully.");
        } catch (IOException e) {
            logger.error("Failed to initialize Google Cloud Storage credentials", e);
            throw new RuntimeException("Failed to initialize Google Cloud Storage credentials", e);
        }

        String fileName = book.getImage();

        if (!fileName.startsWith("http")) {
                // Delete the old image from the bucket
            storage.delete(bucketName, "images/books/" + fileName + ".jpg");
        }


        bookRepository.deleteById(bookId);
    }
}
