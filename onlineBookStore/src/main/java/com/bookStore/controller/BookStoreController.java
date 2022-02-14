package com.bookStore.controller;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.bookStore.entity.Author;
import com.bookStore.entity.Book;
import com.bookStore.entity.Publisher;
import com.bookStore.service.AuthorService;
import com.bookStore.service.BookService;
import com.bookStore.service.PublisherService;

@Controller 
public class BookStoreController {
	
	String imagePath = "C:/Users/TUF/eclipse-workspace/onlineBookStore/src/main/resources/static/images";
	
	@Autowired    
    private BookService bookService;
	
	@Autowired    
    private PublisherService publisherService;
	
	@Autowired    
    private AuthorService authorService;
	
	
	/* ------------------------------          Display Book List     ------------------------------  */

	@RequestMapping(value={"/", "/bookList", "/index"})
	public String WelcomePage(ModelMap modelMap) {
		List<Book> listBook = bookService.listAll();
		modelMap.addAttribute("listBook", listBook);
		return "book/bookList";
	}
	
	
	/* ------------------------------          Add  Book         ------------------------------  */

	@RequestMapping(value= "bookAddForm", method = RequestMethod.GET)
	public String bookAddForm(Map<String, Object> model) throws IOException {
		Book book = new Book();
		List<Author> listAuthorDropDownList = authorService.listAll();
    	List<Publisher> listPublisherDropDownList = publisherService.listAll();
    	model.put("listPublisherDropDownList", listPublisherDropDownList);
    	model.put("listAuthorDropDownList", listAuthorDropDownList);
		model.put("book", book);
		
		return "book/bookAddForm"; 
	}
	

	@RequestMapping(value= "bookSave", method = RequestMethod.POST)
	public String submit(
			Map<String, Object> model, 
			Book book, 
			@RequestParam("image") MultipartFile image) throws IOException {
		
		
		// Check if duplicate ==> don't save
    	if (bookService.searchCheck(book.getTitle(), book.getAuthor(), book.getDate(), book.getPublisher()) < 1) {
    		// I want to check whether the string from java script has pass to model
    		String fileName = StringUtils.cleanPath(image.getOriginalFilename());
    		book.setImage(fileName);
    		// Save 
    		bookService.save(book);

    		File dir = new File(imagePath + "/book_/" + book.getId().toString() + '/');
    		
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
    		 
    		model.put("book", book);
    		
    		return "redirect:/bookList";
    	}
    	
    	
    	else {
    		
    		return "book/bookDuplicate";
    	}
	}
	
	
	/* ------------------------------          Delete  Book by ID         ------------------------------  */
 
	@RequestMapping("/bookDelete")
    public String id_deleteBookForm(@RequestParam Long id) {
		bookService.delete(id);
		return "redirect:/bookList";	
    }
    
    
    
    /* ------------------------------           Edit Book by ID          ------------------------------  */
 
    @RequestMapping("/bookEdit")
	public ModelAndView editCustomerForm(@RequestParam Long id) {
		ModelAndView mavBook = new ModelAndView("book/bookEditForm");
		Book book = bookService.get(id);
		mavBook.addObject("book", book);		
		return mavBook;
	}
    
    
    /* ------------------------------         Commit change via edit      ------------------------------  */
 	@RequestMapping(value = "/localStorage_" , method = RequestMethod.POST)
 	public @ResponseBody ModelAndView searchLocalStorage(@RequestBody String box) {
 			if (!box.startsWith("id=")) {
 				int size = 7;
 			
 				String[] list = box.split(",");
 				
 				int totalAmount = list.length;
 				int num = totalAmount / size;
 				
 				// Settings
 				String[] arr; 
 				
 				// Divide a array into n times with size of 7
 				for (int i = 0; i < num; i++) {
 					arr = Arrays.copyOfRange(list, (i * size) , (size * (i + 1)) );  //  0, 7 => 7, 14 => 14, 21 ...
 					Long id = Long.parseLong(arr[0].trim());
 					String title = arr[1].trim();
 					String author = arr[2].trim();
 					String date = arr[3].trim();
 					String publisher = arr[4].trim();
 					String summary = arr[5].trim();
 					boolean soldOut = ((Boolean.parseBoolean(arr[6].trim()) == true));  
 					
 					
 					bookService.updateBook(title, author, date, publisher, summary, soldOut, id);				
 			}
 		}
 			// Using ModelAndView to Return BookList Page, otherwise return in String format == document.write()
 			List<Book> listBook = bookService.listAll();
 			ModelAndView mavBook = new ModelAndView("book/bookList");
 			mavBook.addObject("listBook", listBook);
 			return mavBook;
 	}
 	

 	/* ------------------------------         Delete book by KEYWORD      ------------------------------  */
   
 	@RequestMapping("/bookDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Book book = new Book();
    	model.put("book", book);  
        return "book/bookDeleteForm";   
    }    
    

    @RequestMapping("/bookDeleteList")
    public String showDeleteList(@RequestParam String title) {
    	bookService.deleteByTitle(title);
    	return "redirect:/bookList";
    }

    
    /* ------------------------------         Search book by KEYWORD      ------------------------------  */

	@RequestMapping("/bookSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Book book = new Book();
		model.put("book", book);  
		return "book/bookSearchForm";		
	}	
    

	@RequestMapping("/bookSearchList")
	public ModelAndView search(@RequestParam String title) {
		List<Book> bookResult = bookService.searchByKeyWord(title);
		ModelAndView mavBook = new ModelAndView("book/bookSearchList");
		mavBook.addObject("bookResult", bookResult);
		return mavBook;		
	}	
	
	
	/* ------------------------------        Book Detail Information       ------------------------------  */
	
	@RequestMapping("/bookTitle")
	public ModelAndView bookInformation(@RequestParam Long id) {
		ModelAndView mavBook = new ModelAndView("book/bookInfo");
		Book book = bookService.get(id);
		mavBook.addObject("book", book);		
		return mavBook;
	}
	
/* ------------------------------        Book Detail Information       ------------------------------  */
	
	@RequestMapping("/bookImage")
	public ModelAndView bookImage(@RequestParam Long id) {
		ModelAndView mavBook = new ModelAndView("book/bookImage");
		Book book = bookService.get(id);
		mavBook.addObject("book", book);		
		return mavBook;
	}
	
	
	

}
