package com.samLibrary.samLibrary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class BookReviewDto {

    private String id;
    private String bookId;
    private String title;
    private String review;
    private String userId;
    private int rating;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTimestamp;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime editTimestamp;
}