package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.service.UserService;
import jakarta.validation.Valid;
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

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto UserDto) {
        UserDto savedUser = userService.createUser(UserDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID userId) {
        UserDto UserDto = userService.getUserById(userId);
        return ResponseEntity.ok(UserDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);

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
