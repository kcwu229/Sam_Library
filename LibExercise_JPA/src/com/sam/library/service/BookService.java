package com.sam.library.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sam.library.entity.Book;
import com.sam.library.repository.BookRepository;


@Service
@Transactional
public class BookService {  
	@Autowired BookRepository repo;
	
	
	////////////////////////////////////////////   1. SHOW  BOOK    //////////////////////////////////////////
	
	
	public List<Book> listAll() {
		return (List<Book>) repo.findAll();
	}
	
	public Book get(Long id) {
		return repo.findById(id).get();
	}
	
	
	///////////////////////////////////////////    2. ADD  BOOK    //////////////////////////////////////////
	
	
	//Save To SQL
	public void save(Book book){    
	    repo.save(book);
	}    
    
	
	///////////////////////////////////////////   3. DELETE  BOOK    //////////////////////////////////////////
	
	
	public void delete(Long id) {
		repo.deleteById(id);
	}
		
	// Delete and return by list (ALL)
	public void deleteByTitle(String title) {
		repo.deleteByTitle(title);
	}
	
	
	///////////////////////////////////////////   4. SEARCH  BOOK    //////////////////////////////////////////
	
	
    // Search and return by list (ALL)
	public List<Book> searchByKeyWord(String title) {
		return repo.search(title);
	}
}