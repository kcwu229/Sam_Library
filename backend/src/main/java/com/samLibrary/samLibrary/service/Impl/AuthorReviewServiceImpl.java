package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.entity.Author;
import com.samLibrary.samLibrary.entity.AuthorReview;
import com.samLibrary.samLibrary.mapper.AuthorReviewMapper;
import com.samLibrary.samLibrary.repository.AuthorRepository;
import com.samLibrary.samLibrary.repository.AuthorReviewRepository;
import com.samLibrary.samLibrary.service.AuthorReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorReviewServiceImpl implements AuthorReviewService {
    private AuthorReviewRepository authorReviewRepository;
    private AuthorRepository authorRepository;

    @Override
    public AuthorReviewDto createAuthorReview(AuthorReviewDto AuthorReviewDto, UUID authorId) {
        Author Author = authorRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found with id " + AuthorReviewDto.getAuthorId()));

        AuthorReview authorReview = new AuthorReview();
        authorReview.setAuthor(Author);
        authorReview.setReview(AuthorReviewDto.getReview());
        authorReview.setTitle(AuthorReviewDto.getTitle());
        authorReview.setRating(AuthorReviewDto.getRating());
        authorReview.setCreateTimestamp(LocalDateTime.now());
        authorReview = authorReviewRepository.save(authorReview);
        return AuthorReviewMapper.mapToAuthorReviewDto(authorReview);
    }

    @Override
    public AuthorReviewDto getAuthorReviewById(UUID AuthorReviewId) {
        AuthorReview AuthorReview = authorReviewRepository.findById(AuthorReviewId).orElseThrow(
                () -> new RuntimeException("Author Review not found")
        );
        return null;
    }

    @Override
    public AuthorReviewDto updateAuthorReview(AuthorReviewDto authorReviewDto, UUID authorId) {
        AuthorReview existingAuthorReview = authorReviewRepository.findById(authorReviewDto.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found with id " + authorReviewDto.getAuthorId()));


        Author Author = authorRepository.findById(authorReviewDto.getAuthorId()).orElseThrow(
                () -> new RuntimeException("Author not found with id " + authorReviewDto.getAuthorId())
        );

        existingAuthorReview.setAuthor(Author);
        existingAuthorReview.setReview(authorReviewDto.getReview());
        existingAuthorReview.setRating(authorReviewDto.getRating());

        AuthorReview authorReview = authorReviewRepository.save(existingAuthorReview);
       return AuthorReviewMapper.mapToAuthorReviewDto(authorReview);
    }

    @Override
    public void deleteAuthorReview(UUID authorReviewId) {
        AuthorReview AuthorReview = authorReviewRepository.findById(authorReviewId)
                .orElseThrow(() -> new RuntimeException("Author Review not found with id " + authorReviewId));
        authorReviewRepository.deleteById(authorReviewId);

    }

    @Override
    public List<AuthorReviewDto> getAllAuthorReviews(UUID AuthorId) {
        return authorReviewRepository.findByAuthorId(AuthorId).stream()
                .map(AuthorReviewMapper::mapToAuthorReviewDto)
                .collect(Collectors.toList());
    }
}