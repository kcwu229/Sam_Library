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

import com.bookStore.entity.Publisher;
import com.bookStore.service.PublisherService;

@Controller
public class PublisherController {
	
	String imagePath = "C:/Users/TUF/eclipse-workspace/onlineBookStore/src/main/resources/static/images";
	
	@Autowired    
    private PublisherService publisherService;
	
	
    /* ------------------------------          Display publisher list   ------------------------------  */
	
	@RequestMapping(value="/publisherList")
	public String publisherList(ModelMap modelMap) {
		List<Publisher> listPublisher = publisherService.listAll();
		modelMap.addAttribute("listPublisher", listPublisher);
		return "publisher/publisherList";
	}
	
	
    /* ------------------------------          Add publisher     ------------------------------  */
	
	@RequestMapping(value= "publisherAddForm", method = RequestMethod.GET)
	public String publisherAddForm(Map<String, Object> model) throws IOException {
		Publisher publisher = new Publisher();
		model.put("publisher", publisher);
		
		return "publisher/publisherAddForm"; 
	}
	
	
	@RequestMapping(value= "publisherSave", method = RequestMethod.POST)
	public String submit(
			Map<String, Object> model, 
			Publisher publisher, 
			@RequestParam("image") MultipartFile image) throws IOException {
		
		if (publisherService.searchCheckPublisher(publisher.getPublisher(), publisher.getSummary()) < 1) {
    		
			String fileName = StringUtils.cleanPath(image.getOriginalFilename());
			publisher.setImage(fileName);
			
			// Save 
			publisherService.save(publisher);
			File dir = new File(imagePath + "/publisher_/" + publisher.getId().toString() + '/');
			
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
			 
			model.put("publisher", publisher);
			
			return "redirect:/publisherList";
    	}
    	
    	else {
    		return "publisher/publisherDuplicate";
    	}

	}


    /* ------------------------------          Delete Publisher by id     ------------------------------  */

    @RequestMapping("/publisherDelete")
    public String id_deletePublisherForm(@RequestParam Long id) {
		publisherService.delete(id);
		return "redirect:/publisherList";	
    }
    
    
    /* ------------------------------          Delete Publisher by KEYWORD     ------------------------------  */

    @RequestMapping("/publisherDeleteForm")
    public String batch_deleteForm(Map<String, Object> model){
    	Publisher publisher = new Publisher();
    	model.put("publisher", publisher);  
        return "publisher/publisherDeleteForm";   
    }    
    

    @RequestMapping("/publisherDeleteList")
    public String showDeleteList(@RequestParam String publisher) {
    	publisherService.deleteByPublisher(publisher);
    	return "redirect:/publisherList";
    }
    
    
    /* ------------------------------          Search Publisher by KEYWORD     ------------------------------  */
    // Search Book
	@RequestMapping("/publisherSearchForm")
	public String searchForm(Map<String, Object> model) {
    	Publisher publisher = new Publisher();
		model.put("publisher", publisher);  
		return "publisher/publisherSearchForm";		
	}	
    
    // Search Book
	@RequestMapping("/publisherSearchList")
	public ModelAndView search(@RequestParam String publisher) {
		List<Publisher> publisherResult = publisherService.searchPublisherByKeyWord(publisher);
		ModelAndView mavPublisher = new ModelAndView("publisher/publisherSearchList");
		mavPublisher.addObject("publisherResult", publisherResult);
		return mavPublisher;		
	}	
	
}
