package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.BookReviewDto;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.mapper.BookReviewMapper;
import com.samLibrary.samLibrary.repository.BookReviewRepository;
import com.samLibrary.samLibrary.service.BookReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookReviewServiceImpl implements BookReviewService {
    private BookReviewRepository bookReviewRepository;

    @Override
    public BookReviewDto createBookReview(BookReviewDto bookReviewDto) {
        BookReview bookReview = BookReviewMapper.mapToBookReviewEntity(bookReviewDto, book);
        return null;
    }

    @Override
    public BookReviewDto getBookReviewById(UUID bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId);
        return null;
    }

    @Override
    public BookReviewDto updateBookReview(BookReviewDto bookReviewDto, UUID bookReviewId, UUID authorId) {
       BookReview bookReview = bookReviewRepository.findById(bookReviewId);
        return null;
    }

    @Override
    public void deleteBookReview(UUID bookReviewId) {
        BookReview bookReview = bookReviewRepository.findById(bookReviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Book Review not found with id " + bookReviewId));
        bookReviewRepository.deleteById(bookReviewId);

    }
}
