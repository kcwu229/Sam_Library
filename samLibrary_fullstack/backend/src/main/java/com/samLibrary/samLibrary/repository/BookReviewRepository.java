package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookReviewRepository extends JpaRepository<Author, UUID> {

}
