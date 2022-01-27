package com.library.entity;    

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Publisher {  
	
	@Id
	@Column(name="publisherID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	

	@Column(name="publisherName")
	private String publisher;
	
	@Column(name="publisherDescription")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	

}
