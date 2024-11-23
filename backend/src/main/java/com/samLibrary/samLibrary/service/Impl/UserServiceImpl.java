package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.exception.UserAlreadyExistsException;
import com.samLibrary.samLibrary.mapper.UserMapper;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        // Check if username already exists
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = UserMapper.mapToUserEntity(userDto);
        user.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userToBeUpdate, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        user.setUsername(userToBeUpdate.getUsername());
        user.setEmail(userToBeUpdate.getEmail());
        user.setPassword(userToBeUpdate.getPassword());
        user.setFirstName(userToBeUpdate.getFirstName());
        user.setLastName(userToBeUpdate.getLastName());
        User savedUpdated = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUpdated);
    }


    @Override
    public List<UserDto> getAllUsers() {
        return List.of();
    }

    @Override
    public void deleteUser(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );


        userRepository.deleteById(userId);
    }

    @Override
    public boolean authenticate(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User does not exist in the database");
        }

        User user = userOptional.get();


        boolean isPasswordMatch = bCryptPasswordEncoder.matches(password, user.getPassword());
        logger.info("Result of password comparison: " + isPasswordMatch);

        if (!isPasswordMatch) {
            throw new BadCredentialsException("The password is incorrect");
        }

        return true;
    }

    @Override
    public UserDto getUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User does not exist in the database");
        }
        User user = optionalUser.get();

        return UserMapper.mapToUserDto(user);
    }
}
