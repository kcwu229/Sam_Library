package com.library.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.library.entity.Publisher;
import com.library.repository.PublisherRepository;



@Service
@Transactional
public class PublisherService {  
	@Autowired PublisherRepository repo;
	
	
	////////////////////////////////////////////   1. SHOW  BOOK    //////////////////////////////////////////
	
	
	public List<Publisher> listAll() {
		return (List<Publisher>) repo.findAll();
	}
	
	
	public Publisher get(Long id) {
		return repo.findById(id).get();
	}
	
	
	///////////////////////////////////////////    2. ADD  BOOK    //////////////////////////////////////////
	
	
	//Save To SQL
	public void save(Publisher publisher){    
	    repo.save(publisher);
	}    
    
	
	///////////////////////////////////////////   3. DELETE  BOOK    //////////////////////////////////////////
	
	
	public void delete(Long id) {
		repo.deleteById(id);
	}
		
	// Delete and return by list (ALL)
	public void deleteByPublisher(String publisher) {
		repo.deleteByAuthor(publisher);
	}
	
	
	///////////////////////////////////////////   4. SEARCH  BOOK    //////////////////////////////////////////
	
	
    // Search and return by list (ALL)
	public List<Publisher> searchPublisherByKeyWord(String publisher) {
		return repo.searchPublisher(publisher);
	}
	
	// Validate the duplicate case
	public int searchCheckPublisher(String publisher, String description) {
		List<Publisher> publisher_item = repo.search_checkPublisher(publisher, description);
		int num = publisher_item.size();
		return num;		
	}
}