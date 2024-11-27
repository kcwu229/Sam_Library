package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.AuthorReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AuthorReviewRepository extends JpaRepository<AuthorReview, String> {
    List<AuthorReview> findByAuthorId(String AuthorId);
}
