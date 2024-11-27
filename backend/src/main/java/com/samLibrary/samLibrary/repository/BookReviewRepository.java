package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.dto.BookReviewResponse;
import com.samLibrary.samLibrary.entity.Author;
import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.entity.BookReview;
import com.samLibrary.samLibrary.entity.User;
import com.samLibrary.samLibrary.service.BookService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview, String> {
    List<BookReview> findByBookId(String bookId);

}
