package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.dto.BookReviewResponse;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.mapper.BookMapper;
import com.samLibrary.samLibrary.mapper.BookReviewMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.repository.BookReviewRepository;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.BookReviewService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {

    private BookReviewRepository bookReviewRepository;
    private BookRepository bookRepository;
    private UserRepository userRepository;
    private BookReviewMapper bookReviewMapper;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    @Override
    public BookReviewDto createBookReview(BookReviewDto bookReviewDto, String bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookReviewDto.getBookId()));

        logger.info("THE BOOK OBJ is : {}", book);

        BookReview bookReview = new BookReview();
        bookReview.setBook(book);
        bookReview.setReview(bookReviewDto.getReview());
        bookReview.setRating(bookReviewDto.getRating());
        bookReview.setTitle(bookReviewDto.getTitle());
        bookReview.setCreateTimestamp(LocalDateTime.now());
        bookReview = bookReviewRepository.save(bookReviewMapper.toEntity(bookReviewDto));

        logger.info("THE BOOK REVIEW OBJ is : {}", bookReview);
        return bookReviewMapper.toDto(bookReview);
    }

    @Override
    public BookReviewDto getBookReviewById(String bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId).orElseThrow(
                () -> new RuntimeException("Book Review not found")
        );
        return null;
    }

    @Override
    public BookReviewDto updateBookReview(BookReviewDto bookReviewDto, String bookReviewId) {
        BookReview existingBookReview = bookReviewRepository.findById(bookReviewId)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookReviewId));

        Book book = bookRepository.findById(bookReviewDto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookReviewDto.getBookId()));

        existingBookReview.setBook(book);
        existingBookReview.setReview(bookReviewDto.getReview());
        existingBookReview.setTitle(bookReviewDto.getTitle());
        existingBookReview.setRating(bookReviewDto.getRating());
        BookReview updatedBookReview = bookReviewRepository.save(existingBookReview);
        return bookReviewMapper.toDto(updatedBookReview);
    }

    @Override
    public void deleteBookReview(String bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId)
                .orElseThrow(() -> new RuntimeException("Book Review not found with id " + bookReviewId));
        bookReviewRepository.deleteById(bookReviewId);

    }

    @Override
    public List<BookReviewDto> getUserCommentByBookId(String bookId) {
        return List.of();
    }


    @Override
    public List<BookReviewResponse> findBookReviewResponseByBookId(String bookId) {
        List<BookReview> bookReviews = bookReviewRepository.findByBookId(bookId);
        return bookReviews.stream().map(bookReview -> {
            BookReviewDto bookReviewDto = bookReviewMapper.toDto(bookReview);
            String userId = bookReview.getUserId();
            User user = userRepository.findById(userId).orElseThrow(
                    () -> new RuntimeException("User not found")
            );
            String username = user.getUsername();
            String firstName = user.getFirstName();
            String lastName = user.getLastName();
            return new BookReviewResponse(bookReviewDto, username, userId, firstName, lastName);
        }).collect(Collectors.toList());
    }



}
