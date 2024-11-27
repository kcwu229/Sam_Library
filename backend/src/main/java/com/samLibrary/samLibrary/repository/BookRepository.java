package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.List;

public interface BookRepository extends JpaRepository<Book,String>, BookRepositoryCustom {

    @Query("SELECT DISTINCT b.category FROM Book b")
    List<String> findAllCategories();


    @Query(
            "SELECT b FROM Book b WHERE " +
                    "LOWER(b.title) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(b.author) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(b.category) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(b.isbn) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "LOWER(b.publisher) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
                    "CAST(b.publishedDate AS string) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Book> searchBooksByAllFields(String searchText);

}
