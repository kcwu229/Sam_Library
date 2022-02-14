package com.bookStore.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bookStore.entity.Book;


// Dao == Repository

@Repository
@Transactional
public interface BookRepository extends CrudRepository<Book, Long> {

	// Table name should be Capitalized
	@Query(value = "SELECT b FROM Book b WHERE b.title LIKE '%' || :keyword || '%'")
	public List<Book> search(@Param("keyword") String title);
	
	
	// Validate duplicate row data
	@Query(value = "SELECT b FROM Book b WHERE b.title = :title "
			+ "AND b.author = :author "
			+ "AND b.date = :date "
			+ "AND b.publisher = :publisher ")
	public List<Book> search_check(@Param("title") String title, @Param("author") String author,
			@Param("date") String date, @Param("publisher") String publisher);
	
	
	
	// Void -- will not return list that is deleted	
	// delete by book title (No need to use List on batch delete)
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Book WHERE LOWER(title) = :title")
    void deleteByTitle(@Param("title") String title);
	
	
	
	@Modifying
	@Query(value = "UPDATE Book b SET b.title = :title, b.author = :author , b.date = :date, "
			+ "b.publisher = :publisher , b.summary = :summary, b.soldOut = :soldOut WHERE b.id = :id ") 
    void updateBook(@Param("title") String title, @Param("author") String author, @Param("date") String date, @Param("publisher") String publisher, 
    		@Param("summary") String summary, @Param("soldOut") boolean soldOut, @Param("id") Long id);
	


}
