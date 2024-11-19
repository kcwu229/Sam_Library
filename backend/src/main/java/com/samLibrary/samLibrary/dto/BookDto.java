package com.samLibrary.samLibrary.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
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

    @NotBlank(message = "title is required")
    private String title;

    private String author;

    @NotNull(message = "publishedYear is required")
    @Min(value = 0, message = "publishedYear should be greater than 0")
    @Max(value = 3000, message = "publishedYear should be less than 2022")
    private int publishedYear;

    //@NotBlank(message = "Image name is required")
    private String imageName;

    private String isbn;

    private String bookDescription;

    private String imageUrl;

}

