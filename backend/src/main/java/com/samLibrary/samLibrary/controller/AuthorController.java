package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.AuthorDto;
import com.samLibrary.samLibrary.dto.BookDto;
import com.samLibrary.samLibrary.service.AuthorService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/authors")
@AllArgsConstructor
public class AuthorController {

    private AuthorService authorService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<AuthorDto> createAuthor(@RequestPart("author") @Valid AuthorDto authorDto,
                                                  @RequestPart("file") @Valid MultipartFile file) {
        AuthorDto savedAuthor = authorService.createAuthor(authorDto, file);
        return new ResponseEntity<>(savedAuthor, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> getAuthorById(@PathVariable("id") String id) {
        AuthorDto authorDto = authorService.getAuthorById(id);
        return ResponseEntity.ok(authorDto);
    }

    @GetMapping
    public ResponseEntity<List<AuthorDto>> getAllAuthors() {
        List<AuthorDto> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);

    }

    @PutMapping("{id}")
    public ResponseEntity<AuthorDto> updateAuthor(
            @RequestPart("author") AuthorDto updatedAuthor,
            @PathVariable("id") String authorId,
            @RequestPart("file") @Valid MultipartFile file) {
        AuthorDto authorDto = authorService.updateAuthor(updatedAuthor, authorId, file);
        return ResponseEntity.ok(authorDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable("id") String authorId) {
        authorService.deleteAuthor(authorId);
        return ResponseEntity.ok("Author deleted successfully");
    }

}
