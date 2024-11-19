package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
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

    @Column(name = "book_title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "published_year")
    private int publishedYear;

    // store the imageName in the database (UUID)
    @Column(name = "image_name")
    private String imageName;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "book_description", columnDefinition = "MEDIUMTEXT")
    private String bookDescription;

    @Column(name = "catch_phrase", columnDefinition = "MEDIUMTEXT")
    private String catchPhrase;

}
