package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.mapper.BookReviewMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.repository.BookReviewRepository;
import com.samLibrary.samLibrary.service.BookReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {
    private BookReviewRepository bookReviewRepository;
    private BookRepository bookRepository;

    @Override
    public BookReviewDto createBookReview(BookReviewDto bookReviewDto) {
        Book book = bookRepository.findById(bookReviewDto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookReviewDto.getBookId()));
        BookReview bookReview = BookReviewMapper.mapToBookReviewEntity(bookReviewDto, book);
        BookReview saveBookReview = bookReviewRepository.save(bookReview);
        return BookReviewMapper.mapToBookReviewDto(saveBookReview);
    }

    @Override
    public BookReviewDto getBookReviewById(UUID bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId).orElseThrow(
                () -> new RuntimeException("Book Review not found")
        );
        return null;
    }

    @Override
    public BookReviewDto updateBookReview(BookReviewDto bookReviewDto, UUID bookReviewId, UUID authorId) {
       BookReview existingBookReview = bookReviewRepository.findById(bookReviewId).orElseThrow(
                () -> new RuntimeException("Book Review not found")
       );
        // Assuming you have a method to verify the user ID
        // verifyUserId(existingBookReview, userId);

       existingBookReview.setReview(bookReviewDto.getReview());
       existingBookReview.setRating(bookReviewDto.getRating());

       BookReview updatedBookReview = bookReviewRepository.save(existingBookReview);
       return BookReviewMapper.mapToBookReviewDto(updatedBookReview);
    }

    @Override
    public void deleteBookReview(UUID bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId)
                .orElseThrow(() -> new RuntimeException("Book Review not found with id " + bookReviewId));
        bookReviewRepository.deleteById(bookReviewId);

    }
}
