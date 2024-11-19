package com.samLibrary.samLibrary.service.Impl;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.mapper.UserMapper;
import com.samLibrary.samLibrary.repository.UserRepository;
import com.samLibrary.samLibrary.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
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
}

