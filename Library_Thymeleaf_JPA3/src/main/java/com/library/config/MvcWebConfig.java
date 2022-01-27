package com.library.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.VersionResourceResolver;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;


@Configuration
@EnableWebMvc
@ComponentScan("com.library")
public class MvcWebConfig implements WebMvcConfigurer{

   @Autowired
   private ApplicationContext applicationContext;

   /*
    * STEP 1 - Create SpringResourceTemplateResolver
    * */
   @Bean
   public SpringResourceTemplateResolver templateResolver() {
      SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
      templateResolver.setTemplateMode(TemplateMode.HTML);
      templateResolver.setApplicationContext(applicationContext);
      templateResolver.setPrefix("/WEB-INF/templates/");
      templateResolver.setSuffix(".html");
      templateResolver.setCharacterEncoding("UTF-8");
      return templateResolver;
   }
   
   @Override 
   public void addResourceHandlers(ResourceHandlerRegistry registry) { 
	   registry.addResourceHandler("/static/**") 
	   .addResourceLocations("classpath:/static/") 
	   .resourceChain(false) 
	   .addResolver(new VersionResourceResolver() 
			   .addContentVersionStrategy("/**")); } 
   
   /*
    * STEP 2 - Create SpringTemplateEngine
    * */
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