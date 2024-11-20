package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.AuthorReviewDto;
import com.samLibrary.samLibrary.entity.AuthorReview;
import com.samLibrary.samLibrary.entity.Author;

public class AuthorReviewMapper {
    public static AuthorReviewDto mapToAuthorReviewDto(AuthorReview authorReview) {
        return new AuthorReviewDto(
                authorReview.getId(),

                authorReview.getAuthor().getId(),
                authorReview.getTitle(),

                authorReview.getReview(),
                authorReview.getRating(),
                authorReview.getCreateTimestamp(),
                authorReview.getEditTimestamp()
        );
    }

    public static AuthorReview mapToAuthorReviewEntity(AuthorReviewDto AuthorReviewDto, Author Author) {
        return new AuthorReview(
                AuthorReviewDto.getId(),
                Author,
                AuthorReviewDto.getTitle(),

                AuthorReviewDto.getReview(),
                AuthorReviewDto.getRating(),
                AuthorReviewDto.getCreateTimestamp(),
                AuthorReviewDto.getEditTimestamp()
        );
    }
}
