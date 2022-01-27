package com.library.config;

import javax.servlet.Filter;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	   @Override
	   protected Class<?>[] getRootConfigClasses() {
	      return null;
	   }

	   @Override
	   protected Class<?>[] getServletConfigClasses() {
	      return new Class[] { MvcWebConfig.class };
	   }

	   @Override
	   protected String[] getServletMappings() {
	      return new String[] { "/" };
	   }
	   
	   
	   // Fix the problem of showing garble word in form/ in list after filling form (input)
	   @Override
		protected Filter[] getServletFilters() {
			CharacterEncodingFilter filter = new CharacterEncodingFilter();
			filter.setEncoding("UTF-8");
			filter.setForceRequestEncoding(true);
			return new Filter[] {filter};  
		}
	   
}
