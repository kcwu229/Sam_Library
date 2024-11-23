package com.samLibrary.samLibrary.security;

import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    /*
    * The UserDetailsService interface is used by
    * Spring Security to load user-specific data.
    * It is crucial for the authentication process,
    * as it provides the UserDetails needed to perform
    * authentication and authorization.
    * */

    private final UserRepository userRepository;

    // Constructor to inject the UserRepository dependency
    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to load user details by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("This user does not exist in the database"));

            // If user is found, return a UserPrincipal object
            return new UserPrincipal(user);

    }
}