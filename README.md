# Spring-MVC-Exericse
![gg](https://user-images.githubusercontent.com/79691025/149938094-e4ee60dc-79c4-45e7-89db-3dbec0ceca10.PNG)

Background:

#### You are owner in Sam's library, due to COVID-19, you design start an online library to lend books to readers. And you are going to build a webpage with up-to-date book list to readers recommendation and also for promotion. As a result, you have to build:
     1. Search
     2. Adding 
     3. Delete
     
     
---------------------------------------------------------------------------------------------
## Tools I've used:

Java Spring MVC framework, with ...
    1. LibController.java
    2. Book.java
    3. BookDao.java
    4. Config file(web.xml, servlet.xml)
    5. Jsp files  --- with Bootstrap CSS
    
Javascript Part is progressing ...

-------------------------------------------------------------------------------------------

## Design Stage:
A. Function of BookDao:

      - Reduce of dependency between Entity & Database 
      - Easy for maintenance (via Interface setting)

B. Function of  Book:

      - Set up Entity  Class 
      - Later pass into Database 

C. Function of Controller:

      - Mapping with request (route)
      - Return certain function & view

D. Function of Config File:

      - Setting the .jsp location & controller location -- RequestMapping for the controller via auto-creation of FrontController and MySQL database
        
-------------------------------------------------------------------------------------------

## III. Logic

    RequestMapping("/") to open the index page via the Tomcat Server
    Through <a href=""> linking to another web route 
    Send request to Dispatcher Servlet then assignment to Controller Class -- Other View Page
    Access the data from view to Dispatcher Servlet, execute the function (Change in Database via SQL Query) then pass the result to Model
    Showing the data from Model to view

Repeating Step 3 to 5.

## Previews:
--------------------------------------------------------------------------------------------

1. Welcome to my Library WebPage:
![Index](https://user-images.githubusercontent.com/79691025/150518349-a701a804-6a34-45fc-80a5-625708e66cbb.PNG)

--------------------------------------------------------------------------------------------
2. Every week I would update my recommendations to all of you:
![add form](https://user-images.githubusercontent.com/79691025/150518453-a990f530-3791-4768-ba26-abbbf3bedda1.PNG)

--------------------------------------------------------------------------------------------
3. And you can see them through the Book List.
![booklist](https://user-images.githubusercontent.com/79691025/150518509-97d13cf8-fe1d-4543-af26-df8fea9f1580.PNG)

--------------------------------------------------------------------------------------------
4. If you have already interest in certain books, feel free to use the search function to access further information
![wqfq](https://user-images.githubusercontent.com/79691025/150518896-545fc5f6-3c5b-40c3-8ca6-80aa4e755711.PNG)

--------------------------------------------------------------------------------------------
5. All data accessed would be save into DataBase. So convenient!
![wfqwfqwf](https://user-images.githubusercontent.com/79691025/149938430-71ce3d04-d4e1-4d76-9205-6a5c20b35321.PNG)

--------------------------------------------------------------------------------------------

Updates:
1. Adding two more databases: author and publisher, and making connection with three databases:
--> When adding books, allowing drop down list for both author and publisher for user/ librarian to pick instead of typing every time.

2. Adding Validations on checking the duplication and the date format of the adding form.


