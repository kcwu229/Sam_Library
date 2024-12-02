package com.samLibrary.samLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDetailResponse {
    private List<BookReviewResponse> bookReviews;
    private int reviewerCount;
    private int averageRating;
}
