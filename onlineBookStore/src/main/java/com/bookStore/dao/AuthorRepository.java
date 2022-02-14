package com.bookStore.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bookStore.entity.Author;



// Dao == Repository

@Repository
@Transactional
public interface AuthorRepository extends CrudRepository<Author, Long> {

	
	// Table name should be Capitalized
	@Query(value = "SELECT a FROM Author a WHERE a.author LIKE '%' || :keyword || '%'")
	public List<Author> searchAuthor(@Param("keyword") String author);
	
	
	// Validate duplicate row data
	@Query(value = "SELECT a FROM Author a WHERE a.author = :author AND a.summary = :summary ")
	public List<Author> search_checkAuthor(@Param("author") String author, @Param("summary") String summary);
	
	// Void -- will not return list that is deleted	
	// delete by book title (No need to use List on batch delete)
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Author WHERE LOWER(author) = :author")
    void deleteByAuthor(@Param("author") String author);
	
}
