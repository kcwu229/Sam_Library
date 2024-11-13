package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

}