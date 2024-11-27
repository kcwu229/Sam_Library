package com.samLibrary.samLibrary.controller;

import com.samLibrary.samLibrary.dto.RegisterRequest;
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

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);


    // user profile
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") String userId) {
        UserDto UserDto = userService.getUserById(userId);
        return ResponseEntity.ok(UserDto);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);

    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto updatedUser, @PathVariable("id") String userId) {
        UserDto UserDto = userService.updateUser(updatedUser, userId);
        return ResponseEntity.ok(UserDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }


}
