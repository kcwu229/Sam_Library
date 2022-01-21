 <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>    
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
  
<h1>Book List</h1>  
<table border="2" width="70%" cellpadding="2">  
<tr><th>Id</th><th>Book Title</th><th>Author</th><th>Year of Publish</th><th>Publisher</th><th>Edit</th><th>Delete</th></tr>  
   <c:forEach var="book" items="${list}">   
   <tr>  
   <td>${book.id}</td>  
   <td>${book.title}</td>  
   <td>${book.author}</td>  
   <td>${book.year}</td> 
   <td>${book.publisher}</td>  
   <td><a href="editbook/${book.id}">Edit</a></td>  
   <td><a href="deletebook/${book.id}">Delete</a></td>  
   </tr>  
   </c:forEach>  
   </table>  
   <br/>  
   <a href="bookform">Add New Book</a>  