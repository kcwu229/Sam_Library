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

import com.library.entity.Author;
import com.library.service.AuthorService;


@Controller    
public class AuthorController {    
    
	@Autowired    
    private AuthorService authorService;
    
	////////////////////////////////////////////    1. ADD  Author    //////////////////////////////////////////	
	
	// Book List
	@RequestMapping("/authorList")
	public ModelAndView ShowAuthorList() {
		List<Author> listAuthor = authorService.listAll();
		ModelAndView mavAuthor = new ModelAndView("authorList");
		mavAuthor.addObject("listAuthor", listAuthor);
		return mavAuthor;
	}
	
    // Add-Book Form
    @RequestMapping(value="/authorAddForm", method=RequestMethod.GET)
    public String newAuthorForm(Map<String, Object> model){
    	Author author = new Author();
    	model.put("author", author);  
        return "authorAddForm";   
    }    
    
    // Save New Book
    @RequestMapping(value="/authorSave", method=RequestMethod.POST)
    public String saveAuthor(@ModelAttribute("author") Author author) {
    	
    	// Search ... WHERE xxx = xxx ... to find duplicate case
    	if (authorService.searchCheckAuthor(author.getAuthor(), author.getDescription()) < 1) {
    		authorService.save(author);
    		return "redirect:/authorList";
    	}
    	
    	else {
    		return "authorDuplicate";
    	}
    } 

    ////////////////////////////////////////////  2. EDIT   BOOK    //////////////////////////////////////////
    
   
    // Edit book
    @RequestMapping("/authorEdit")
	public ModelAndView editCustomerForm(@RequestParam Long id) {
		ModelAndView mavAuthor = new ModelAndView("authorEditForm");
		Author author = authorService.get(id);
		mavAuthor.addObject("author", author);
		return mavAuthor;
	}
    
    
    /////////////////////////////////////////////  3. DELETE   BOOK   //////////////////////////////////////////
    
    
    // Delete 1 Book
    @RequestMapping("/authorDelete")
    public String id_deleteAuthorForm(@RequestParam Long id) {
		authorService.delete(id);
		return "redirect:/authorList";	
    }
    
    // Delete-Book Form
    @RequestMapping("/authorDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Author author = new Author();
    	model.put("author", author);  
        return "authorDeleteForm";   
    }    
    
    // Batch delete Book
    @RequestMapping("/authorDeleteList")
    public String showDeleteList(@RequestParam String author) {
    	authorService.deleteByAuthor(author);
    	return "redirect:/authorList";
    }
    ////////////////////////////////////////////    4. SEARCH   BOOK    ////////////////////////////////////////// 
    
    
    // Search Book
	@RequestMapping("/authorSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Author author = new Author();
		model.put("author", author);  
		return "authorSearchForm";		
	}	
    
    // Search Book
	@RequestMapping("/authorSearchList")
	public ModelAndView search(@RequestParam String author) {
		List<Author> authorResult = authorService.searchAuthorByKeyWord(author);
		ModelAndView mavAuthor = new ModelAndView("authorSearchList");
		mavAuthor.addObject("authorResult", authorResult);
		return mavAuthor;		
	}	
}