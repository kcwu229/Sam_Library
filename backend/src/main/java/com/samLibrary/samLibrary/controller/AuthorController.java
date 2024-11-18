package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.service.AuthorService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/authors")
@AllArgsConstructor
public class AuthorController {

    private AuthorService authorService;

    @PostMapping
    public ResponseEntity<AuthorDto> createAuthor(@Valid @RequestBody AuthorDto authorDto) {
        AuthorDto savedAuthor = authorService.createAuthor(authorDto);
        return new ResponseEntity<>(savedAuthor, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<AuthorDto> getAuthorById(@PathVariable UUID authorId) {
        AuthorDto authorDto = authorService.getAuthorById(authorId);
        return ResponseEntity.ok(authorDto);
    }

    @GetMapping
    public ResponseEntity<List<AuthorDto>> getAllAuthors() {
        List<AuthorDto> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);

    }

    @PutMapping("{id}")
    public ResponseEntity<AuthorDto> updateAuthor(@RequestBody AuthorDto updatedAuthor, @PathVariable("id") UUID authorId) {
        AuthorDto authorDto = authorService.updateAuthor(updatedAuthor, authorId);
        return ResponseEntity.ok(authorDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable("id") UUID authorId) {
        authorService.deleteAuthor(authorId);
        return ResponseEntity.ok("Author deleted successfully");
    }

}
