package com.bookStore.config;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebApp extends AbstractAnnotationConfigDispatcherServletInitializer {
	
    public WebApp() {
        super();
    }
    
    @Override  
    protected Class<?>[] getRootConfigClasses() {
        return null;
    }
    
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebMVCConfig.class};
    }
    
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
    
    @Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter filter = new CharacterEncodingFilter();
		filter.setEncoding("UTF-8");
		filter.setForceRequestEncoding(true);
		return new Filter[] {filter};  
	}
   
    
    
    // Parse MediaFile Uploaded
    @Override
    protected void customizeRegistration(Dynamic registration) {

        MultipartConfigElement multiPart = new MultipartConfigElement("C:/Temp/", 1024 * 1024 * 5, 1024 * 1024 * 10, 1024 * 1024 * 3);

        registration.setMultipartConfig(multiPart);
    }

    
}