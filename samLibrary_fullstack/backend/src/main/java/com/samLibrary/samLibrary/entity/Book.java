package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "isbn")
    private String isbn;
}
