package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "author")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "birth_year")
    private int birthYear;

    @Column(name = "country")
    private String country;

    @Column(name = "death_year")
    private int deathYear;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "catch_phrase", columnDefinition = "MEDIUMTEXT")
    private String catchPhrase;

    @Column(name = "description", columnDefinition = "MEDIUMTEXT")
    private String description;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AuthorReview> reviews;

    public Author(String id, String name, String country, int birthYear,
                  int deathYear,String imageName, String description, String catchPhrase) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.birthYear = birthYear;
        this.deathYear = deathYear;
        this.imageName = imageName;
        this.description = description;
        this.catchPhrase = catchPhrase;
    }
}
