package com.bookStore.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookStore.dao.PublisherRepository;
import com.bookStore.entity.Publisher;



@Service
@Transactional
public class PublisherService {  
	@Autowired PublisherRepository repo;
	
	
	////////////////////////////////////////////   1. SHOW   //////////////////////////////////////////
	
	
	public List<Publisher> listAll() {
		return (List<Publisher>) repo.findAll();
	}
	
	
	public Publisher get(Long id) {
		return repo.findById(id).get();
	}
	
	
	///////////////////////////////////////////    2. ADD  //////////////////////////////////////////
	
	
	//Save To SQL
	public void save(Publisher publisher){    
	    repo.save(publisher);
	}    
    
	
	///////////////////////////////////////////   3. DELETE   //////////////////////////////////////////
	
	
	public void delete(Long id) {
		repo.deleteById(id);
	}
		
	// Delete and return by list (ALL)
	public void deleteByPublisher(String publisher) {
		repo.deleteByAuthor(publisher);
	}
	
	
	///////////////////////////////////////////   4. SEARCH   //////////////////////////////////////////
	
	
    // Search and return by list (ALL)
	public List<Publisher> searchPublisherByKeyWord(String publisher) {
		return repo.searchPublisher(publisher);
	}
	
	// Validate the duplicate case
	public int searchCheckPublisher(String publisher, String summary) {
		List<Publisher> publisher_item = repo.search_checkPublisher(publisher, summary);
		int num = publisher_item.size();
		return num;		
	}
}