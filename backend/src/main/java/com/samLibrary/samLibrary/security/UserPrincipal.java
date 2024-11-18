package com.samLibrary.samLibrary.security;

import com.samLibrary.samLibrary.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

// UserPrincipal class implements UserDetails interface to provide user information to Spring Security
public class UserPrincipal implements UserDetails {

    private User user;

    // Constructor to initialize UserPrincipal with a User object
    public UserPrincipal(User user) {
        this.user = user;
    }

    // Method to get authorities granted to the user
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    // Method to get the user's password
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // Method to get the user's username
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // Method to check if the user's account is not expired
    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    // Method to check if the user's account is not locked
    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    // Method to check if the user's credentials are not expired
    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    // Method to check if the user is enabled
    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}