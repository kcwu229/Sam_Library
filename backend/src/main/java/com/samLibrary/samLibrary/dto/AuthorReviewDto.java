// BookReviewDto.java
package com.samLibrary.samLibrary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class AuthorReviewDto {
    private UUID id;

    @NotNull(message = "Book ID is required")
    private UUID authorId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Review is required")
    private String review;

    @NotNull(message = "Rating is required")
    private int rating;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTimestamp;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime editTimestamp;

}