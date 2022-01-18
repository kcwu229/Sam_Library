# Spring-MVC-Exericse

-------------------------------------------------------------------------------------------
![gg](https://user-images.githubusercontent.com/79691025/149938094-e4ee60dc-79c4-45e7-89db-3dbec0ceca10.PNG)

Background:

### You are owner in Sam's library, due to COVID-19, you design start an online library to lend books to readers. And you are going to build a webpage with up-to-date book list to readers recommendation and also for promotion. As a result, you have to build:
     1. Search function
     2. Adding book
     3. Deleting book
     
     
---------------------------------------------------------------------------------------------
## Tools I've used:

Java Spring MVC framework
    1. LibController.java
    2. Book.java
    3. BookDao.java
    4. Config file(web.xml, servlet.xml)
    5. Jsp file

MVC version: Spring MVC
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

1. Index Page:
![111111](https://user-images.githubusercontent.com/79691025/149938373-8a50401d-6684-4427-baf8-d2b8ca2d5074.PNG)

2. Add Book:
![wfwqfqw](https://user-images.githubusercontent.com/79691025/149938387-48f61247-f7db-4be7-9440-3dd53e9b1fd7.PNG)

3. ![fewgq](https://user-images.githubusercontent.com/79691025/149938396-d15739f9-cd9d-4dbd-b202-7510352af464.PNG)
Showing Book List   &  Editing/Deleting Data:

4. Search By Title/Author/ Publisher/Year (Progressing ...): 

5. Database:
![wfqwfqwf](https://user-images.githubusercontent.com/79691025/149938430-71ce3d04-d4e1-4d76-9205-6a5c20b35321.PNG)


