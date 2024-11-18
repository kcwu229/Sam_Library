package com.samLibrary.samLibrary.mapper;

import com.samLibrary.samLibrary.dto.UserDto;
import com.samLibrary.samLibrary.entity.User;

public class UserMapper {
    // Add the mapToUserDto method
    public static UserDto mapToUserDto(User user) {
        {
            return new UserDto(
                    user.getId(),
                    user.getUsername(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPassword(),
                    user.getEmail()
            );
        }
    }

    // Add the mapToUserEntity method
    public static User mapToUserEntity(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getUsername(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getPassword(),
                userDto.getEmail()
        );
    }
}
