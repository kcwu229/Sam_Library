package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Book;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    private int rating;

    private Book book;
}
