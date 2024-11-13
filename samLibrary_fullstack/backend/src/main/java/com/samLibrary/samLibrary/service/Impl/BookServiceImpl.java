package com.samLibrary.samLibrary.service.Impl;


import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.mapper.BookMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;

    @Override
    public BookDto createBook(BookDto bookDto) {
        Book book = BookMapper.mapToBookEntity(bookDto);
        Book savedBook = bookRepository.save(book);
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
        book.setImageUrl(bookToBeUpdated.getImageUrl());
        book.setIsbn(bookToBeUpdated.getIsbn());
        book.setTitle(bookToBeUpdated.getTitle());
        book.setPublishedYear(bookToBeUpdated.getPublishedYear());
        Book updatedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(updatedBook);
    }

    @Override
    public void deleteBook(UUID bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new RuntimeException("Book not found")
        );
        bookRepository.deleteById(bookId);
    }
}
