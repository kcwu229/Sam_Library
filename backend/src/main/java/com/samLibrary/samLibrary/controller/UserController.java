package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.LoginRequest;
import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.service.Impl.BookServiceImpl;
import com.samLibrary.samLibrary.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDto UserDto) {
            UserDto savedUser = userService.createUser(UserDto);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // login and return user id for later use
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            String jwtToken= userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            if (jwtToken != null) {
                UserDto userDto = userService.getUserByUsername(loginRequest.getUsername());
                session.setAttribute("user", loginRequest.getUsername());
                return new ResponseEntity<>(jwtToken, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
            }
        } catch (Exception e) {
            logger.error("Login failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid username or password");
        }
    }

    // user profile
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") UUID userId) {
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
