package com.bookStore.config;

import javax.persistence.EntityManagerFactory;

import org.hibernate.dialect.MySQL5Dialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = {"com.bookStore"})
@EnableTransactionManagement
public class JpaConfig extends MySQL5Dialect {
	
    @Bean
    public LocalEntityManagerFactoryBean entityManagerFactory() {
        LocalEntityManagerFactoryBean factoryBean = new LocalEntityManagerFactoryBean();
        factoryBean.setPersistenceUnitName("BookDataBase");
         
        return factoryBean;
    }
     
    @Bean
    public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
         
        return transactionManager;
    }  
    
    @Override
    public String getTableTypeString() {
    	
        return "ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
