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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Review is required")
    @Column(name = "book_review",columnDefinition = "MEDIUMTEXT")
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

    @PreUpdate
    protected void onUpdate() {
        editTimestamp = LocalDateTime.now();
    }
}