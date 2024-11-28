package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookReviewRepository extends JpaRepository<BookReview, String> {
    List<BookReview> findByBookId(String bookId);

    Optional<BookReview> findById(String id);

}
