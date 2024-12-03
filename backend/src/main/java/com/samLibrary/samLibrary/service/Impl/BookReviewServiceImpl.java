package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookDetailResponse;
import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.dto.BookReviewResponse;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.mapper.BookReviewMapper;
import com.samLibrary.samLibrary.repository.BookRepository;
import com.samLibrary.samLibrary.repository.BookReviewRepository;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.BookReviewService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {

    private BookReviewRepository bookReviewRepository;
    private BookRepository bookRepository;
    private UserRepository userRepository;
    @Qualifier("simpMessagingTemplate")
    private SimpMessagingTemplate messagingTemplate;
    private BookReviewMapper bookReviewMapper;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    @Override
    public BookReviewDto createBookReview(BookReviewDto bookReviewDto, String bookId, String userId) {
        logger.info("Starting to create book review for bookId: {} and userId: {}", bookId, userId);

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookId));

        BookReview bookReview = new BookReview();
        String bookReviewId = UUID.randomUUID().toString();
        bookReview.setId(bookReviewId);
        bookReview.setBook(book);
        bookReview.setCreateTimestamp(LocalDateTime.now());

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            logger.error("User not found with id {}", userId);
            throw new RuntimeException("User not found with id " + userId);
        }
        bookReview.setUserId(userId);
        bookReview.setRating(bookReviewDto.getRating());
        bookReview.setReview(bookReviewDto.getReview());
        bookReview.setTitle(bookReviewDto.getTitle());
        bookReview = bookReviewRepository.save(bookReview);
        BookReviewDto result = bookReviewMapper.toDto(bookReview);
        String review = result.getReview();
        String reviewId = result.getId();
        String title = result.getTitle();
        int rating = result.getRating();
        BookReviewResponse reviewResponse =
                new BookReviewResponse(rating, review, title, reviewId,
                        user.get().getUsername(),
                        userId, user.get().getFirstName(), user.get().getLastName(),
                        user.get().getImage(), bookReview.getCreateTimestamp());
        // Send the review to the client
        messagingTemplate.convertAndSend("/topic/reviews",result);

        return result;
    }

    @Override
    public BookReviewDto getBookReviewById(String bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId).orElseThrow(
                () -> new RuntimeException("Book Review not found")
        );
        return bookReviewMapper.toDto(bookReview);
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
    public void deleteBookReview(String bookReviewId, String bookId, String userId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + bookId));

        Optional<BookReview> bookReview = bookReviewRepository.findById(bookReviewId);
        BookReview bookReviewObj = bookReview.get();

        logger.info("User id: {}", userId);
        logger.info("User id from book: {}", bookReviewObj.getUserId());

        if (!bookReviewObj.getUserId().equals(userId)) {
            logger.error("User with id {} is not allowed to delete book review with id {}", userId, bookReviewId);
            throw new RuntimeException("User with id " + userId + " is not allowed to delete book review with id " + bookReviewId);
        }

        bookReviewRepository.deleteById(bookReviewId);
    }

    @Override
    public List<BookReviewDto> getUserCommentByBookId(String bookId) {
        return List.of();
    }


    @Override
    public BookDetailResponse findBookReviewResponseByBookId(String bookId) {
        AtomicInteger sumRating = new AtomicInteger();
        List<BookReview> bookReviews = bookReviewRepository.findByBookId(bookId);
        if (bookReviews.isEmpty()) {
            logger.warn("No book reviews found for bookId: {}", bookReviews);
        } else {
            logger.info("Found {} book reviews for bookId: {}", bookReviews.size(), bookReviews.get(0).getBook().getId());
            bookReviews.forEach(review -> logger.info("BookReview: {}", review));
        }
        for (var i = 0; i < bookReviews.size(); i ++) {}
        List<BookReviewResponse> bookReviewResponses = bookReviews.stream().map(bookReview -> {

            List<BookReviewResponse> bookReviewResponses2 = new ArrayList<>();

            sumRating.addAndGet(bookReview.getRating());
            BookReviewDto bookReviewDto = bookReviewMapper.toDto(bookReview);

            String userId = bookReview.getUserId();
            User user = userRepository.findById(userId).orElseThrow(
                    () -> new RuntimeException("User not found")
            );

            String username = user.getUsername();
            String firstName = user.getFirstName();
            String lastName = user.getLastName();
            String userImage = user.getImage();
            String review = bookReviewDto.getReview();
            String reviewId = bookReviewDto.getId();
            String title = bookReviewDto.getTitle();
            int rating = bookReviewDto.getRating();
            return new BookReviewResponse(rating,review,title, reviewId, username, userId, firstName,
                    lastName, userImage, bookReview.getCreateTimestamp());
        }).collect(Collectors.toList());

        int reviewerCount = bookReviewResponses.size();
        int avgRating = sumRating.get() / reviewerCount;

        bookReviewResponses.sort(Comparator.comparing(BookReviewResponse::getCreateTimestamp).reversed());
        BookDetailResponse bookDetailResponse = new BookDetailResponse(bookReviewResponses, reviewerCount, avgRating);
        return bookDetailResponse;
    }




}
