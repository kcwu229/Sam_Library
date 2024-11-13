package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.mapper.UserMapper;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Override
    public UserDto createAuthor(UserDto userDto) {
        User user = UserMapper.mapToUserEntity(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getAuthorById(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto updateAuthor(UserDto userToBeUpdate, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        user.setUserName(userToBeUpdate.getUserName());
        user.setEmail(userToBeUpdate.getEmail());
        user.setPassword(userToBeUpdate.getPassword());
        user.setFirstName(userToBeUpdate.getFirstName());
        user.setLastName(userToBeUpdate.getLastName());
        User savedUpdated = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUpdated);
    }

    @Override
    public void deleteAuthor(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Employee not found")
        );
        userRepository.deleteById(userId);
    }
}

