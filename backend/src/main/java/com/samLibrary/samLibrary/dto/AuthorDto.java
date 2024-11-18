package com.samLibrary.samLibrary.dto;

import jakarta.validation.constraints.*;
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

    @NotBlank(message = "name is required")
    private String name;

    @NotNull(message = "birthYear is required")
    @Max(value = 3000, message = "birthYear should be less than 3000")
    @Min(value = 0, message = "birthYear should be greater than 0")
    private int birthYear;

    @NotNull(message = "birthYear is required")
    @Max(value = 3000, message = "birthYear should be less than 3000")
    @Min(value = 0, message = "birthYear should be greater than 0")
    private int deathYear;

    @NotBlank(message = "country is required")
    private String country;

    @NotBlank(message = "imageUrl is required")
    private String imageUrl;

    private String description;
}
