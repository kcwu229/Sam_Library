package com.samLibrary.samLibrary.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private UUID id;

    private String title;

    private String author;

    private int publishedYear;

    private String imageUrl;

    private String isbn;

    private String bookIntroduction;
}

