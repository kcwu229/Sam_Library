package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.exception.UserAlreadyExistsException;
import com.samLibrary.samLibrary.mapper.UserMapper;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.JWTService;
import com.samLibrary.samLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);
    private UserRepository userRepository;
    private UserMapper userMapper;

    AuthenticationManager authManager;



    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        return userMapper.toDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userToBeUpdate, String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        user.setUsername(userToBeUpdate.getUsername());
        user.setEmail(userToBeUpdate.getEmail());
        user.setPassword(userToBeUpdate.getPassword());
        user.setFirstName(userToBeUpdate.getFirstName());
        user.setLastName(userToBeUpdate.getLastName());
        User savedUpdated = userRepository.save(user);
        return userMapper.toDto(savedUpdated);
    }


    @Override
    public List<UserDto> getAllUsers() {
        return List.of();
    }

    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        userRepository.deleteById(userId);
    }



    @Override
    public UserDto getUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User does not exist in the database");
        }
        User user = optionalUser.get();

        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserByBookReviewUserId(String UserId) {
        return null;
    }
}
