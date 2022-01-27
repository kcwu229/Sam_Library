package com.library.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.library.entity.Author;
import com.library.repository.AuthorRepository;



@Service
@Transactional
public class AuthorService {  
	@Autowired AuthorRepository repo;
	
	
	////////////////////////////////////////////   1. SHOW  BOOK    //////////////////////////////////////////
	
	
	public List<Author> listAll() {
		return (List<Author>) repo.findAll();
	}
	
	
	public Author get(Long id) {
		return repo.findById(id).get();
	}
	
	
	///////////////////////////////////////////    2. ADD  BOOK    //////////////////////////////////////////
	
	
	//Save To SQL
	public void save(Author author){    
	    repo.save(author);
	}    
    
	
	///////////////////////////////////////////   3. DELETE  BOOK    //////////////////////////////////////////
	
	
	public void delete(Long id) {
		repo.deleteById(id);
	}
		
	// Delete and return by list (ALL)
	public void deleteByAuthor(String author) {
		repo.deleteByAuthor(author);
	}
	
	
	///////////////////////////////////////////   4. SEARCH  BOOK    //////////////////////////////////////////
	
	
    // Search and return by list (ALL)
	public List<Author> searchAuthorByKeyWord(String author) {
		return repo.searchAuthor(author);
	}
	
	// Validate the duplicate case
	public int searchCheckAuthor(String author, String description) {
		List<Author> author_item = repo.search_checkAuthor(author, description);
		int num = author_item.size();
		return num;		
	}
}