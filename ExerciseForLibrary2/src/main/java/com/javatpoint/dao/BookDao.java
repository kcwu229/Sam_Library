package com.javatpoint.dao;    
import java.sql.ResultSet;    
import java.sql.SQLException;    
import java.util.List;    
import org.springframework.jdbc.core.BeanPropertyRowMapper;    
import org.springframework.jdbc.core.JdbcTemplate;    
import org.springframework.jdbc.core.RowMapper;    
import com.javatpoint.beans.Book;    
    
public class BookDao {    
JdbcTemplate template;    
    
public void setTemplate(JdbcTemplate template) {    
    this.template = template;    
}    

//Save To SQL
public int save(Book b){    
    String sql="insert into book(title, book_author, book_year, publisher) "
    		+ "values('"+b.getTitle()+"' , '"+b.getAuthor()+"' , '"+b.getYear()+"','"+ b.getPublisher()+"')";    
    return template.update(sql);    
}    

public int update(Book b){    
    String sql="update book set title ='"+b.getTitle()+"', book_author ='"+"1234"+"',book_year ='"+b.getYear()+
    		"', publisher ='"+ b.getPublisher() + "'where book_id ='"+b.getId()+"";    
    return template.update(sql);    
}    

//
public List<Book> getBooks(){    
    return template.query("select * from book",new RowMapper<Book>(){    
        public Book mapRow(ResultSet rs, int row) throws SQLException {    
            Book b=new Book();    
            b.setId(rs.getInt(1));    
            b.setTitle(rs.getString(2));    
            b.setAuthor(rs.getString(3));    
            b.setYear(rs.getInt(4));   
            b.setPublisher(rs.getString(5));            
            return b;    
        }    
    });    
}


// LIKE
public List<Book> searchBooks(String title) {
	return template.query("SELECT * FROM book WHERE title LIKE '%"+ title +"%'" ,new RowMapper<Book>(){    
        public Book mapRow(ResultSet rs, int row) throws SQLException {    
            Book b = new Book();    
            b.setId(rs.getInt(1));    
            b.setTitle(rs.getString(2));    
            b.setAuthor(rs.getString(3));    
            b.setYear(rs.getInt(4));   
            b.setPublisher(rs.getString(5));            
            return b;    
        }    
    });    
}

public void deleteBooks(String title) {
	String sql = "delete from book where title = '%"+ title +"%'";
	template.update(sql);
}
}