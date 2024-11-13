package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createAuthor(@RequestBody UserDto UserDto) {
        UserDto savedAuthor = userService.createUser(UserDto);
        return new ResponseEntity<>(savedAuthor, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getAuthorById(@PathVariable UUID authorId) {
        UserDto UserDto = userService.getUserById(authorId);
        return ResponseEntity.ok(UserDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> authors = userService.getAllUsers();
        return ResponseEntity.ok(authors);

    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto updatedUser, @PathVariable("id") UUID userId) {
        UserDto UserDto = userService.updateUser(updatedUser, userId);
        return ResponseEntity.ok(UserDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

}
