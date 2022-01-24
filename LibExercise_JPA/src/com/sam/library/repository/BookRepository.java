package com.sam.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sam.library.entity.Book;


@Repository
@Transactional
public interface BookRepository extends CrudRepository<Book, Long> {

	
	// Table name should be Capitalized
	@Query(value = "SELECT b FROM Book b WHERE b.title LIKE '%' || :keyword || '%'")
	public List<Book> search(@Param("keyword") String title);
	
	
	// delete by book title (No need to use List on batch delete
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Book WHERE LOWER(title) = :title")
    void deleteByTitle(@Param("title") String title);
}
