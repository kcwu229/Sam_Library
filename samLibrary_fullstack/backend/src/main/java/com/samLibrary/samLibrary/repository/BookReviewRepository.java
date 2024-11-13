package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.Author;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.service.BookService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookReviewRepository extends JpaRepository<BookReview, UUID> {
    List<BookReview> findByBookId(UUID bookId);
}
