<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
  
        <h1>Edit Book</h1>  
       <form:form method="POST" action="/editsave">    
        <table >    
        <tr>  
        <td></td>    
         <td><form:hidden  path="id" /></td>  
         </tr>   
         <tr>    
          <td>Name : </td>   
          <td><form:input path="title"  /></td>  
         </tr>    
         <tr>    
          <td>Author :</td>    
          <td><form:input path="author" /></td>  
         </tr>   
         <tr>    
          <td>Year :</td>    
          <td><form:input path="year" /></td>  
         </tr>   
         <tr>    
          <td>Publisher :</td>    
          <td><form:input path="publisher" /></td>  
         </tr>   
           
         <tr>    
          <td> </td>    
          <td><input type="submit" value="Edit Save" /></td>    
         </tr>    
        </table>    
       </form:form>    