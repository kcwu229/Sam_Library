package com.samLibrary.samLibrary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private UUID id;

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
}
