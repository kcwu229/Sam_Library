package com.samLibrary.samLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookReviewResponse {
    private BookReviewDto bookReviewDto;
    private String username;
    private String userId;
    private String firstName;
    private String lastName;
}
