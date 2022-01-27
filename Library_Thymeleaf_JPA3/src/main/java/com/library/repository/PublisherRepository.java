package com.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.library.entity.Publisher;


// * If entity has many function/ attributes, then each attributes can has its own repository class.

@Repository
@Transactional
public interface PublisherRepository extends CrudRepository<Publisher, Long> {

	
	// Table name should be Capitalized
	@Query(value = "SELECT a FROM Publisher a WHERE a.publisher LIKE '%' || :keyword || '%'")
	public List<Publisher> searchPublisher(@Param("keyword") String publisher);
	
	
	// Validate duplicate row data
	@Query(value = "SELECT a FROM Publisher a WHERE a.publisher = :publisher AND a.description = :description ")
	public List<Publisher> search_checkPublisher(@Param("publisher") String publisher, @Param("description") String description);
	
	// Void -- will not return list that is deleted	
	// delete by book title (No need to use List on batch delete)
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM Publisher WHERE LOWER(publisher) = :publisher")
    void deleteByAuthor(@Param("publisher") String publisher);
	
}
