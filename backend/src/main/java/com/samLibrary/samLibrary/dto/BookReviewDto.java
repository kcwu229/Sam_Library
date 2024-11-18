package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Book;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class BookReviewDto {

    private UUID id;

    private UUID bookId;

    private String review;

    @NotNull(message = "rating is required")
    private int rating;


    private Book book;
}
