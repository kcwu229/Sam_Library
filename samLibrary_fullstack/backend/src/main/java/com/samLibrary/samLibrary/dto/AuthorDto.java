package com.samLibrary.samLibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AuthorDto {

    private UUID id;

    private String name;

    private int birthYear;

    private int deathYear;

    private String country;

    private String imageUrl;

    private String description;
}
