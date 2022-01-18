package com.javatpoint.controllers;     
import java.util.List;    
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
    BookDao dao;//will inject dao from XML file    
        
    /*It displays a form to input data, here "command" is a reserved request attribute  
     *which is used to display object data into form  
     *
     *
     */    
    @RequestMapping(value="/", method = RequestMethod.GET)    
    public String welcome(){      
        return "hello";   
    }    

    
    @RequestMapping(value="/bookform", method = RequestMethod.GET)    
    public String showform(Model m){    
        m.addAttribute("command", new Book());  
        return "bookform";   
    }    
    
    /*It saves object into database. The @ModelAttribute puts request data  
     *  into model object. You need to mention RequestMethod.POST method   
     *  because default request is GET*/    
    @RequestMapping(value="/save",method = RequestMethod.POST)    
    public String save(@ModelAttribute("book") Book book){    
        dao.save(book);    
        return "redirect:/viewbook";//will redirect to viewbook request mapping    
    }    
    
    /* It provides list of employees in model object */    
    @RequestMapping("/viewbook")    
    public String viewemp(Model m){    
        List<Book> list=dao.getBooks();    
        m.addAttribute("list",list);  
        return "viewbook";    
    }    
    /* It displays object data into form for the given id.   
     * The @PathVariable puts URL data into variable.*/    
    @RequestMapping(value="/editbook/{id}")    
    public String edit(@PathVariable int id, Model m){    
        Book book=dao.getBookById(id);    
        m.addAttribute("command",book);  
        return "bookeditform";    
    }    
    /* It updates model object. */    
    @RequestMapping(value="/editsave",method = RequestMethod.POST)    
    public String editsave(@ModelAttribute("book") Book book){    
        dao.update(book);    
        return "redirect:/viewbook";    
    }    
    /* It deletes record for the given id in URL and redirects to /viewbook */    
    @RequestMapping(value="/deletebook/{id}",method = RequestMethod.GET)    
    public String delete(@PathVariable int id){    
        dao.delete(id);    
        return "redirect:/viewbook";    
    }     
}  