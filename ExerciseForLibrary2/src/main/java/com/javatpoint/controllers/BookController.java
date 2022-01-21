package com.javatpoint.controllers;     
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.stereotype.Controller;  
import org.springframework.ui.Model;  
import org.springframework.web.bind.annotation.ModelAttribute;    
import org.springframework.web.bind.annotation.PathVariable;    
import org.springframework.web.bind.annotation.RequestMapping;    
import org.springframework.web.bind.annotation.RequestMethod;

import com.javatpoint.beans.Book;
import com.javatpoint.dao.BookDao;    

@Controller    
public class BookController {    
    @Autowired    
    BookDao dao;
    
    
    @RequestMapping(value={"/", "index"}, method = RequestMethod.GET)    
    public String welcome(){      
        return "index";   
    }    

    @RequestMapping(value="/bookform", method = RequestMethod.GET)    
    public String showform(Model m){    
        m.addAttribute("command", new Book());  
        return "bookform";   
    }    
    
    @RequestMapping(value="/search", method = RequestMethod.GET)    
    public String searchform(Model m){    
        m.addAttribute("command", new Book());  
        return "search_form";   
    }    
    
    @RequestMapping(value="/search_book",method = RequestMethod.POST)    
    public String search(HttpServletRequest request, Model m){    
    	List<Book> searchlist=dao.searchBooks(request.getParameter("title"));
        m.addAttribute("searchlist",searchlist);  
        return "search_book";//will redirect to viewbook request mapping    
    }    
    
    /*It saves object into database. The @ModelAttribute puts request data  
     *  into model object. You need to mention RequestMethod.POST method   
     *  because default request is GET*/    
    @RequestMapping(value="/save",method = RequestMethod.POST)    
    public String save(@ModelAttribute("book") Book book){    
        dao.save(book);    
        return "redirect:/book_list";//will redirect to viewbook request mapping    
    }    
    
    @RequestMapping("/book_list")    
    public String viewbook(Model m){    
        List<Book> list=dao.getBooks();    
        m.addAttribute("list",list);  
        return "book_list";    
    }    
    
    @RequestMapping(value="/delete", method = RequestMethod.GET)    
    public String deleteform(Model m){    
        m.addAttribute("command", new Book());  
        return "delete_form";   
    }    
    
    @RequestMapping(value="/delete_book",method = RequestMethod.POST)    
    public String delete(HttpServletRequest request, Model m){    
    	dao.deleteBooks(request.getParameter("title")); 
    	List<Book> list=dao.getBooks();    
        m.addAttribute("list",list); 
        return "delete_book";//will redirect to viewbook request mapping    
    }    
    
    /*
     * 
     * 
     * 
     *     @RequestMapping(value="/editsave",method = RequestMethod.POST)    
    public String editsave(@ModelAttribute("book") Book book){    
        dao.update(book);    
        return "redirect:/preview";    
    }    
       
    @RequestMapping(value="/editbook/{id}")    
    public String edit(@PathVariable int id, Model m){    
        Book book=dao.getBookById(id);
        System.out.println(book.getAuthor());
        m.addAttribute("command",book);  
        return "bookeditform";    
        
           
    @RequestMapping(value="/deletebook/{id}",method = RequestMethod.GET)    
    public String delete(@PathVariable int id){    
        dao.delete(id);    
        return "redirect:/preview";    
    }
    }    */
}  