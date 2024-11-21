package com.samLibrary.samLibrary.entity;

import com.samLibrary.samLibrary.entity.BookReview;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "book_title", nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "published_year", nullable = false)
    private int publishedYear;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "isbn", nullable = false)
    private String isbn;

    @Column(name = "book_description", columnDefinition = "MEDIUMTEXT")
    private String bookDescription;

    @Column(name = "catch_phrase", columnDefinition = "MEDIUMTEXT")
    private String catchPhrase;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookReview> reviews;

    public Book(UUID id, String title, String author, int publishedYear, String imageName, String isbn, String bookDescription, String catchPhrase) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.imageName = imageName;
        this.isbn = isbn;
        this.bookDescription = bookDescription;
        this.catchPhrase = catchPhrase;
    }

}