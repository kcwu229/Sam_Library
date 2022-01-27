package com.library.controller;     
import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.library.entity.Publisher;
import com.library.service.PublisherService;


@Controller    
public class PublisherController {    
    
	@Autowired    
    private PublisherService publisherService;
    
	////////////////////////////////////////////    1. ADD  Publisher    //////////////////////////////////////////	
	
	// Book List
	@RequestMapping("/publisherList")
	public ModelAndView ShowAuthorList() {
		List<Publisher> listPublisher = publisherService.listAll();
		ModelAndView mavPublisher = new ModelAndView("publisherList");
		mavPublisher.addObject("listPublisher", listPublisher);
		return mavPublisher;
	}
	
    // Add-Book Form
    @RequestMapping(value="/publisherAddForm", method=RequestMethod.GET)
    public String newPublisherForm(Map<String, Object> model){
    	Publisher publisher = new Publisher();
    	model.put("publisher", publisher);  
        return "publisherAddForm";   
    }    
    
    // Save New Book
    @RequestMapping(value="/publisherSave", method=RequestMethod.POST)
    public String savePublisher(@ModelAttribute("publisher") Publisher publisher) {
    	
    	// Search ... WHERE xxx = xxx ... to find duplicate case
    	if (publisherService.searchCheckPublisher(publisher.getPublisher(), publisher.getDescription()) < 1) {
    		publisherService.save(publisher);
    		return "redirect:/publisherList";
    	}
    	
    	else {
    		return "publisherDuplicate";
    	}
    } 

    ////////////////////////////////////////////  2. EDIT   BOOK    //////////////////////////////////////////
    
   
    // Edit book
    @RequestMapping("/publisherEdit")
	public ModelAndView editCustomerForm(@RequestParam Long id) {
		ModelAndView mavPublisher = new ModelAndView("publisherEditForm");
		Publisher publisher = publisherService.get(id);
		mavPublisher.addObject("publisher", publisher);
		return mavPublisher;
	}
    
    
    /////////////////////////////////////////////  3. DELETE   BOOK   //////////////////////////////////////////
    
    
    // Delete 1 Book
    @RequestMapping("/publisherDelete")
    public String id_deletePublisherForm(@RequestParam Long id) {
		publisherService.delete(id);
		return "redirect:/publisherList";	
    }
    
    // Delete-Book Form
    @RequestMapping("/publisherDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Publisher publisher = new Publisher();
    	model.put("publisher", publisher);  
        return "publisherDeleteForm";   
    }    
    
    // Batch delete Book
    @RequestMapping("/publisherDeleteList")
    public String showDeleteList(@RequestParam String publisher) {
    	publisherService.deleteByPublisher(publisher);
    	return "redirect:/publisherList";
    }
    ////////////////////////////////////////////    4. SEARCH   BOOK    ////////////////////////////////////////// 
    
    
    // Search Book
	@RequestMapping("/publisherSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Publisher publisher = new Publisher();
		model.put("publisher", publisher);  
		return "publisherSearchForm";		
	}	
    
    // Search Book
	@RequestMapping("/publisherSearchList")
	public ModelAndView search(@RequestParam String publisher) {
		List<Publisher> publisherResult = publisherService.searchPublisherByKeyWord(publisher);
		ModelAndView mavPublisher = new ModelAndView("publisherSearchList");
		mavPublisher.addObject("publisherResult", publisherResult);
		return mavPublisher;		
	}	
}