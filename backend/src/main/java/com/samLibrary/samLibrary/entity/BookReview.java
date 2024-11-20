// BookReview.java
package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
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

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="book_review", columnDefinition = "MEDIUMTEXT")
    private String review;

    @Column(name="rating")
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