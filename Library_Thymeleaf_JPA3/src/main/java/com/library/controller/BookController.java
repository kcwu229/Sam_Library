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
import com.library.entity.Book;
import com.library.entity.Publisher;
import com.library.service.AuthorService;
import com.library.service.BookService;
import com.library.service.PublisherService;


@Controller    
public class BookController {    
    
	// need to use @Autowired separately, otherwise error occur
	@Autowired    
    private BookService bookService;
	
	@Autowired    
    private PublisherService publisherService;
	
	@Autowired    
    private AuthorService authorService;
    
	// Index WELCOME Page
	@RequestMapping(value={"/", "/index"})  // "/book", "/book/index"
	public String WelcomePage() {
		return "index";
		
		
		
	}
	
	
	////////////////////////////////////////////    1. ADD  BOOK    //////////////////////////////////////////
	
	
	// Book List
	@RequestMapping("/bookList")
	public ModelAndView ShowList() {
		List<Book> listBook = bookService.listAll();
		ModelAndView mavBook = new ModelAndView("bookList");
		mavBook.addObject("listBook", listBook);
		return mavBook;
	}
	
    // Add-Book Form
    @RequestMapping(value="/bookAddForm", method=RequestMethod.GET)
    public String newBookForm(Map<String, Object> model){
    	Book book = new Book();
    	List<Author> listAuthorDropDownList = authorService.listAll();
    	List<Publisher> listPublisherDropDownList = publisherService.listAll();
    	model.put("book", book);  
    	model.put("listPublisherDropDownList", listPublisherDropDownList);
    	System.out.println(listAuthorDropDownList);
    	model.put("listAuthorDropDownList", listAuthorDropDownList);
    	System.out.println(listPublisherDropDownList);
        return "bookAddForm";   
    }    
    
    // Save New Book
    @RequestMapping(value="/bookSave", method=RequestMethod.POST)
    public String saveBook(@ModelAttribute("book") Book book) {
    	
    	// Search ... WHERE xxx = xxx ... to find duplicate case
    	if (bookService.searchCheck(book.getTitle(), book.getAuthor(), book.getDate(), book.getPublisher()) < 1) {
    		bookService.save(book);
    		return "redirect:/bookList";
    	}
    	
    	else {
    		return "bookDuplicate";
    	}
    } 

    ////////////////////////////////////////////  2. EDIT   BOOK    //////////////////////////////////////////
    
   
    // Edit book
    @RequestMapping("/bookEdit")
	public ModelAndView editCustomerForm(@RequestParam Long id) {
		ModelAndView mavBook = new ModelAndView("bookEditForm");
		Book book = bookService.get(id);
		mavBook.addObject("book", book);
		return mavBook;
	}
    
    
    /////////////////////////////////////////////  3. DELETE   BOOK   //////////////////////////////////////////
    
    
    // Delete 1 Book
    @RequestMapping("/bookDelete")
    public String id_deleteBookForm(@RequestParam Long id) {
		bookService.delete(id);
		return "redirect:/bookList";	
    }
    
    // Delete-Book Form
    @RequestMapping("/bookDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Book book = new Book();
    	model.put("book", book);  
        return "bookDeleteForm";   
    }    
    
    // Batch delete Book
    @RequestMapping("/bookDeleteList")
    public String showDeleteList(@RequestParam String title) {
    	bookService.deleteByTitle(title);
    	return "redirect:/bookList";
    }
    ////////////////////////////////////////////    4. SEARCH   BOOK    ////////////////////////////////////////// 
    
    
    // Search Book
	@RequestMapping("/bookSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Book book = new Book();
		model.put("book", book);  
		return "bookSearchForm";		
	}	
    
    // Search Book
	@RequestMapping("/bookSearchList")
	public ModelAndView search(@RequestParam String title) {
		List<Book> bookResult = bookService.searchByKeyWord(title);
		ModelAndView mavBook = new ModelAndView("bookSearchList");
		mavBook.addObject("bookResult", bookResult);
		return mavBook;		
	}	
}