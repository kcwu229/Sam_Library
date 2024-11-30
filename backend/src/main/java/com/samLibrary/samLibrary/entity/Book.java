package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Table(name = "books")
public class Book {
    @Id
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "author", columnDefinition = "LONGTEXT")
    private String author;

    @Column(name = "category", columnDefinition = "LONGTEXT")
    private String category;

    @Column(name = "published_date")
    private String publishedDate;

    @Column(name = "publisher", columnDefinition = "MEDIUMTEXT")
    private String publisher;

    @Column(name = "image", columnDefinition = "LONGTEXT")
    private String image;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String bookDescription;

    @Column(name = "catch_phrase", columnDefinition = "LONGTEXT", nullable = true)
    private String catchPhrase;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookReview> reviews;


}