package com.library.entity;    

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Author {  
	
	@Id
	@Column(name="authorID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	

	@Column(name="authorName")
	private String author;
	
	@Column(name="authorDescription")
	private String description;
	
	
	
	// Getter and Setter
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
    
}
