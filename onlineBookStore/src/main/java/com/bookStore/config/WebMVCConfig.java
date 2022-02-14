package com.bookStore.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;


@Configuration
@EnableWebMvc
@ComponentScan({"com.bookStore"})
public class WebMVCConfig implements WebMvcConfigurer {

	   @Autowired
	   private ApplicationContext applicationContext;


	   @Bean
	   public SpringResourceTemplateResolver templateResolver() {
	      SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
	      templateResolver.setTemplateMode(TemplateMode.HTML);
	      templateResolver.setApplicationContext(applicationContext);
	      templateResolver.setPrefix("/WEB-INF/templates/");
	      templateResolver.setTemplateMode("HTML5");
	      templateResolver.setSuffix(".html");
	      templateResolver.setCacheable(false);
	      return templateResolver;
	   }
	   
	   
	   @Override
	   public void addResourceHandlers(ResourceHandlerRegistry registry) {
	       registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
	       registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/");
	       registry.addResourceHandler("/images/**").addResourceLocations("classpath:/static/images/");
	       exposeDirectory("user-photos", registry);;
	   }
	   
	  
	   // Complement the ResourceHandler
	   private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
	       Path uploadDir = Paths.get(dirName);
	       String uploadPath = uploadDir.toFile().getAbsolutePath();
	         
	       if (dirName.startsWith("../")) dirName = dirName.replace("../", "");
	         
	       registry.addResourceHandler("/" + dirName + "/**").addResourceLocations("file:/"+ uploadPath + "/");
	    }
	   

	   @Bean
	   public SpringTemplateEngine templateEngine() {
	      SpringTemplateEngine templateEngine = new SpringTemplateEngine();
	      templateEngine.setTemplateResolver(templateResolver());
	      templateEngine.setEnableSpringELCompiler(true);
	      return templateEngine;
	   }


	   // Fix the problem of showing garble word in list (display)
	   @Override
	   public void configureViewResolvers(ViewResolverRegistry registry) {
	      ThymeleafViewResolver resolver = new ThymeleafViewResolver();
	      resolver.setTemplateEngine(templateEngine());
	      resolver.setCharacterEncoding("UTF-8");
	      registry.viewResolver(resolver);
	   }
	   
}