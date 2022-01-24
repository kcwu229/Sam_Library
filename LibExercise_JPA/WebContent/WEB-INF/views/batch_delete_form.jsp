<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>    
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
   
   <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
   
   
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700,900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="fonts/icomoon/style.css">

    <link rel="stylesheet" href="css/owl.carousel.min.css">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    
    <!-- Style -->
    <link rel="stylesheet" href="css/style.css">

    <title>Delete Books</title>
  </head>
  <body>
  

  <div class="content">
    
    <div class="container">

      
      <div class="row justify-content-center">
        <div class="col-md-10">
          
          <div class="row align-items-center">
            <div class="col-lg-7 mb-5 mb-lg-0">

              <h2 class="mb-5">Just fill in the form. <br> It's easy.</h2>

              <form:form class="border-right pr-5 mb-5" method="post" id="contactForm2" name="contactForm2" action="delete_book_list" modelAttribute="book">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <form:input type="text" class="form-control" name="title" id="title" placeholder="Book Title" path="title"/>
                  </div>
                </div>
                
                              
                <div class="row">
                  <div class="col-md-12">
                    <input type="submit" value="Delete" class="btn btn-primary rounded-0 py-2 px-4">
                    <span class="submitting"></span>
                  </div>
                  
                </div>
              </form:form>

            </div>
            <div class="col-lg-4 ml-auto">
              <h3 class="mb-4">This Book is out-of-date !</h3>
              <p>In order to recommend the best books and promote the reading habits to readers, this online library is going to promote the most-updated one.</p>
              <p><a href="#">Start reading from TODAY !</a></p>
            </div>
          </div>
        </div>  
        </div>
      </div>
  </div>
  
	  <footer>
	   <a class="space" href="index">Return Homepage</a>  
	   <a class="space" href="book_list">Book List</a>
	 </footer>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>




<style>


.hm-gradient {
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
}
.darken-grey-text {
    color: #2E2E2E;
}
.input-group.md-form.form-sm.form-2 input {
    border: 1px solid #bdbdbd;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input.purple-border {
    border: 1px solid #9e9e9e;
}
.input-group.md-form.form-sm.form-2 input[type=text]:focus:not([readonly]).purple-border {
    border: 1px solid #ba68c8;
    box-shadow: none;
}
.form-2 .input-group-addon {
    border: 1px solid #ba68c8;
}
.danger-text {
    color: #ff3547; 
}  
.success-text {
    color: #00C851; 
}
.table-bordered.red-border, .table-bordered.red-border th, .table-bordered.red-border td {
    border: 1px solid #ff3547!important;
}        
.table.table-bordered th {
    text-align: center;
}

.space {
	margin: 30px 50px 30px 50px;
	padding: 30px 50px 30px 50px;
}

</style>