package com.library.entity;    

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Book {  
	
	@Id
	@Column(name="bookID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	// Adding Hibernate validator to check for the format
	@Column(name="bookTitle")
	private String title;
	
	
	@Column(name="bookAuthor")
	private String author;
	
	@Column(name="bookDate")
	private String date;
	
	@Column(name="bookPublisher")
	private String publisher;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}
	
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getPublisher() {
		return publisher;
	}
	
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
}
