package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "book_review")
public class BookReview {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @NotBlank(message = "Title is required")
    @Column(name = "title", columnDefinition = "LONGTEXT")
    private String title;

    @NotBlank(message = "Review is required")
    @Column(name = "book_review", columnDefinition = "LONGTEXT")
    private String review;

    @NotNull(message = "Rating is required")
    private int rating;

    private LocalDateTime createTimestamp;
    private LocalDateTime editTimestamp;

    @PrePersist
    protected void onCreate() {
        createTimestamp = LocalDateTime.now();
        editTimestamp = LocalDateTime.now();
    }

    @Column(name = "user_id")
    private String userId;

    @PreUpdate
    protected void onUpdate() {
        editTimestamp = LocalDateTime.now();
    }
}