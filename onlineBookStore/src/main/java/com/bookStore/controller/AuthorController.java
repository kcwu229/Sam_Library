package com.bookStore.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.bookStore.entity.Author;
import com.bookStore.service.AuthorService;

@Controller
public class AuthorController {
	
	String imagePath = "C:/Users/TUF/eclipse-workspace/onlineBookStore/src/main/resources/static/images";
	
	@Autowired    
    private AuthorService authorService;
	
	
	/* ------------------------------          Display   Author List     ------------------------------  */
	@RequestMapping(value="/authorList")
	public String authorList(ModelMap modelMap) {
		List<Author> listAuthor = authorService.listAll();
		modelMap.addAttribute("listAuthor", listAuthor);
		return "author/authorList";
	}
	
	
	
	/* ------------------------------                Add author         ------------------------------  */
	@RequestMapping(value= "authorAddForm", method = RequestMethod.GET)
	public String authorAddForm(Map<String, Object> model) throws IOException {
		Author author = new Author();
		model.put("author", author);
		
		return "author/authorAddForm"; 
	}
	
	
	@RequestMapping(value= "authorSave", method = RequestMethod.POST)
	public String submit(
			Map<String, Object> model, 
			Author author, 
			@RequestParam("image") MultipartFile image) throws IOException {
		
	    	
	    	// Search ... WHERE xxx = xxx ... to find duplicate case
	    	if (authorService.searchCheckAuthor(author.getAuthor(), author.getSummary()) < 1) {
	    		String fileName = StringUtils.cleanPath(image.getOriginalFilename());
	    		author.setImage(fileName);
	    		// Save 
	    		authorService.save(author);
	    		
	    		
	    		File dir = new File(imagePath + "/author_/" + author.getId().toString() + '/');
	    		
	    		if (!dir.exists()) {
	    			dir.mkdirs();
	    			 }

	    		// Copy to path
	    		File targetFile = new File(dir, fileName);
	    		
	    		 try {
	    	            image.transferTo(targetFile);
	    	        } 
	    		 
	    		 catch (IOException e) {
	    	            e.printStackTrace();
	    	        }
	    		 
	    		model.put("author", author);
	    		
	    		return "redirect:/authorList";
	    	}
	    	
	    	
	    	else {
	    		return "authorDuplicate";
	    	}
	    } 

	
	/* ------------------------------                Display single author Page        ------------------------------  */
	// Single Author Page
	@RequestMapping(value= "author/{id}", method = RequestMethod.GET)
	public String AuthorSinglePage(Map<String, Object> model) throws IOException {
		Author author = new Author();
		model.put("author", author);
		
		return "author/authorAddForm"; 
	}
	
	
	/* ------------------------------                Edit author  by ID       ------------------------------  */
	
	// Edit book
    @RequestMapping("/authorEdit")
	public ModelAndView editCustomerForm(@RequestParam Long id) {
		ModelAndView mavAuthor = new ModelAndView("authorEditForm");
		Author author = authorService.get(id);
		mavAuthor.addObject("author", author);
		return mavAuthor;
	}
    
    
    /* ------------------------------                Delete author by ID       ------------------------------  */
    // Delete 1 Book
    @RequestMapping("/authorDelete")
    public String id_deleteAuthorForm(@RequestParam Long id) {
		authorService.delete(id);
		return "redirect:/authorList";	
    }
    
    
    
    /* ------------------------------                Delete author by KEYWORD       ------------------------------  */
    // Delete-Book Form
    @RequestMapping("/authorDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Author author = new Author();
    	model.put("author", author);  
        return "author/authorDeleteForm";   
    }    
    
    // Batch delete Book
    @RequestMapping("/authorDeleteList")
    public String showDeleteList(@RequestParam String author) {
    	authorService.deleteByAuthor(author);
    	return "redirect:/authorList";
    }
    
    
    /* ------------------------------                Search author by KEYWORD       ------------------------------  */
    // Search Book
	@RequestMapping("/authorSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Author author = new Author();
		model.put("author", author);  
		return "author/authorSearchForm";		
	}	
    
    // Search Book
	@RequestMapping("/authorSearchList")
	public ModelAndView search(@RequestParam String author) {
		List<Author> authorResult = authorService.searchAuthorByKeyWord(author);
		ModelAndView mavAuthor = new ModelAndView("author/authorSearchList");
		mavAuthor.addObject("authorResult", authorResult);
		return mavAuthor;		
	}	
}
