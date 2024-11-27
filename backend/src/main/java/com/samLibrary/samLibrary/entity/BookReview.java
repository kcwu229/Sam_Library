// BookReview.java
package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

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

    public BookReview(String id, Book book, String title, String review, int rating, String userId) {
        this.id = id;
        this.book = book;
        this.title = title;
        this.review = review;
        this.rating = rating;
        this.userId = userId;
    }
}