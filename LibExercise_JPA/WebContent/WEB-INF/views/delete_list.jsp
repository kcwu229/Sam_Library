<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>   
 

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Search Result</title>
</head>
<body>

<div align="center">
	<h2>Search Result</h2>
	<table border="1" cellpadding="5">
		<tr>
			<th>Book Name</th>
			<th>Author</th>
			<th>Year of Publish</th>
			<th>Publisher</th>
		</tr>
		<c:forEach items="${delete}" var="book">
		<tr>
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.year}</td>
			<td>${book.publisher}</td>
		</tr>
		</c:forEach>
	</table>
	
</div>	

	  <footer>
	   <a class="space" href="index">Return Homepage</a>  
	   <a class="space" href="book_list">Book List</a>
	 </footer>
</body>
</html>