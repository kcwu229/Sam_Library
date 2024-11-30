package com.samLibrary.samLibrary.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.UUID;

@Data
public class BookDto {
    private String id;

    private String title;

    private String category;

    private String author;

    private String publishedDate;

    private String image;

    private String isbn;

    private String bookDescription;

    private String publisher;

    private String catchPhrase;

}

