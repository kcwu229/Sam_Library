# Spring-MVC-Exericse  (Study Purpose)
-- For the most-update version for desktop Webpage ... and still not the final version :)  
-- (For mobile user, sorry about that :(   I will finish it asap ...)
     
web link: Coming Soon ... :)       

## Previews: (v5.0)
--------------------------------------------------------------------------------------------
1. Welcome to distribute the Book Info !!! Please login to edit and add the bookList for this week !!! 
![index](https://user-images.githubusercontent.com/79691025/155766179-cdf7d7f5-01ba-4a29-a2c2-8bcc105151c2.JPG)


--- And If you see the row was highlighted in red Color and greyed, then it means the book is sold! 
<br>

![signUp](https://user-images.githubusercontent.com/79691025/155766348-ea7a3e76-8ed2-46b9-a138-864eac40ff5a.JPG)
<br>
And add those exciting books to our readers!!!!
<br><br>
This page would become more prettier after a period of time :)
![authorIntroduction](https://user-images.githubusercontent.com/79691025/155766445-9a65cb26-b412-4fdf-a818-4f853ca0180f.JPG)


✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨<br>
What ? Cannot find Your favorite author here ! No problem, you can add it here and help finish the author Collection !
![AuthorList](https://user-images.githubusercontent.com/79691025/155766519-11446794-9083-4fe0-bd0d-4de2a2cf6dfe.JPG)

<h3>Let's join us and contribute to the others !!!!</h3>
--------------------------------------------------------------------------------------------

# Background:

#### I am owner in Sam's Book Store, due to COVID-19, I decide to shut down my physical book shop and start an online book store. And you are going to build a webpage with up-to-date book list to readers recommendation and also for promotion. As a result, I provide the following functions
     1. Search
     2. Adding 
     3. Delete
     4. Edit
     5. Check Sold Out Status
     
---------------------------------------------------------------------------------------------
## Tools I've used:

## Web Tool: 
     1. Maven, 
     2. Spring MVC, 
     3. AWS RDS, AWS ELASTIC BEANSTALK

     Java Spring MVC framework, with ...
         1. Controller: BookController & AuthorController & PublisherController
         2. Entity: Book, Author, Publisher
         3. Repository: Book, Author, Publisher
         4. Service:  Book, Author, Publisher
         5. Config file(JpaConfig, MvcWebConfig, WebApplicationConfig)
         6. HTML templates, with CSS and JS 
   
-------------------------------------------------------------------------------------------

## Logic

    RequestMapping("/") to open the index page via the Tomcat Server
    Through <a href=""> linking to another web route 
    Send request to Dispatcher Servlet then assignment to Controller Class -- Other View Page
    Access the data from view to Dispatcher Servlet, execute the function (Change in Database via SQL Query) then pass the result to Model
    Showing the data from Model to view

-------------------------------------------------------------------------------------------

** If you want to deploy maven Spring MVC on AWS, you can check for these two webpage:
   <ul>
     <li> https://hackernoon.com/how-to-deploy-a-java-springboot-app-with-mysql-in-aws-for-free-dn3x34gg </li>
     <li> https://www.youtube.com/watch?v=jNh2_Sq1zy4 </li> 
   </ul>
