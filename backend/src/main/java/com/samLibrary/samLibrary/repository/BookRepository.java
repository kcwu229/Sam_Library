package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {

}
