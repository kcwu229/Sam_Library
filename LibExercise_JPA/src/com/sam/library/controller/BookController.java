package com.sam.library.controller;     
import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.sam.library.entity.Book;
import com.sam.library.service.BookService;

@Controller    
public class BookController {    
    
	@Autowired    
    private BookService bookService;
    
	// Index WELCOME Page
	@RequestMapping(value={"/", "/index"})
	public String WelcomePage() {
		return "index";
	}
	
	
	////////////////////////////////////////////    1. ADD  BOOK    //////////////////////////////////////////
	
	
	// Book List
	@RequestMapping("/book_list")
	public ModelAndView ShowList() {
		List<Book> listBook = bookService.listAll();
		ModelAndView mav = new ModelAndView("book_list");
		mav.addObject("listBook", listBook);
		return mav;
	}
	
    // Add-Book Form
    @RequestMapping(value="/bookform", method=RequestMethod.GET)
    public String newBookForm(Map<String, Object> model){
    	Book book = new Book();
    	model.put("book", book);  
        return "bookform";   
    }    
    
    // Save New Book
    @RequestMapping(value="/save", method=RequestMethod.POST)
    public String saveBook(@ModelAttribute("book") Book book) {
    	bookService.save(book);  
        return "redirect:/book_list";  
    } 
    
    
    ////////////////////////////////////////////  2. EDIT   BOOK    //////////////////////////////////////////
    
   
    // Edit book
    @RequestMapping("/edit")
	public ModelAndView editCustomerForm(@RequestParam long id) {
		ModelAndView mav = new ModelAndView("edit_book");
		Book book = bookService.get(id);
		mav.addObject("book", book);
		return mav;
	}
    
    
    /////////////////////////////////////////////  3. DELETE   BOOK   //////////////////////////////////////////
    
    
    // Delete 1 Book
    @RequestMapping("delete")
    public String id_deleteBookForm(@RequestParam long id) {
		bookService.delete(id);
		return "redirect:/book_list";	
    }
    
    // Delete-Book Form
    @RequestMapping("delete_form")
    public String batch_deleteForm(Map<String, Object> model){
    	Book book = new Book();
    	model.put("book", book);  
        return "batch_delete_form";   
    }    
    
    // Batch delete Book
    @RequestMapping("/delete_book_list")
    public String showDeleteList(@RequestParam String title) {
    	bookService.deleteByTitle(title);
    	return "redirect:/book_list";
    }
    ////////////////////////////////////////////    4. SEARCH   BOOK    ////////////////////////////////////////// 
    
    
    // Search Book
	@RequestMapping("/search")
	public String searchForm(Map<String, Object> model) {
    	Book book = new Book();
		model.put("book", book);  
		return "search_form";		
	}	
        
    // Search Book
	@RequestMapping("/search_list")
	public ModelAndView search(@RequestParam String title) {
		List<Book> result = bookService.searchByKeyWord(title);
		ModelAndView mav = new ModelAndView("search_list");
		mav.addObject("result", result);
		return mav;		
	}	
	
}