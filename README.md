# Spring-MVC-Exericse  (Study Purpose)
(For the most-update version.. and still not the final version :)   )  
     
web link: http://springbookstoreonline-env.eba-2fjwxj2v.us-east-1.elasticbeanstalk.com/ 
(This link may be holded for a short period of time as hosting on AWS is costy ... )

## Previews:
--------------------------------------------------------------------------------------------

1. Welcome to my Library WebPage:

![SSSSS](https://user-images.githubusercontent.com/79691025/152822921-7750da7f-748c-4435-9527-322e871b9235.JPG)

--------------------------------------------------------------------------------------------

2. Every week I would update my recommendations to all of you:

And If you see the row was highlighted in YELLOW Color, then it means the book is sold! 

![SCS](https://user-images.githubusercontent.com/79691025/152823014-500bbd8f-3afe-4cc1-90db-f2909d959d48.JPG)

--------------------------------------------------------------------------------------------
3. If you have already interest in certain books, feel free to use the search function to access further information

![vasvsa](https://user-images.githubusercontent.com/79691025/152823403-2e8721a6-10bf-498f-80a8-a6d9df98caee.JPG)

--------------------------------------------------------------------------------------------
4. If you want to add new author, publisher and book information to benefit more readers, we are welcome!

![savsavsavsa](https://user-images.githubusercontent.com/79691025/152824228-926355ba-de88-4180-9e43-37cb4e70eb07.JPG)

![svasvsa](https://user-images.githubusercontent.com/79691025/152824474-bcc4c6ad-4140-4f58-becb-e8a78259e598.JPG)


In book adding form, your previously written author and publisher data can found from the dropdown list. 
![asvavasavv](https://user-images.githubusercontent.com/79691025/152823761-6ec48020-df68-4200-80a6-caf891b960ba.JPG)

--------------------------------------------------------------------------------------------
5. All data accessed would be save into DataBase. So convenient!
![savs](https://user-images.githubusercontent.com/79691025/152825782-ead84ae0-5c14-440a-afea-96bca5539880.JPG)


--------------------------------------------------------------------------------------------

Updates:
1. Adding two more databases: author and publisher, and making connection with three databases:
--> When adding books, allowing drop down list for both author and publisher for user/ librarian to pick instead of typing every time.

2. Adding Validations on checking the duplication and the date format of the adding form.

3. Shading Backgroundcolor(yellow) to indicate the Book is Sold

--------------------------------------------------------------------------------------------

## Web Tool: 
     1. Maven, 
     2. Spring MVC, 
     3. AWS RDS, AWS ELASTIC BEANSTALK

--------------------------------------------------------------------------------------------
![gg](https://user-images.githubusercontent.com/79691025/149938094-e4ee60dc-79c4-45e7-89db-3dbec0ceca10.PNG)

Background:

#### I am owner in Sam's Book Store, due to COVID-19, I decide to shut down my physical book shop and start an online book store. And you are going to build a webpage with up-to-date book list to readers recommendation and also for promotion. As a result, I provide the following functions
     1. Search
     2. Adding 
     3. Delete
     4. Edit
     5. Check Sold Out Status
     
---------------------------------------------------------------------------------------------
## Tools I've used:

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
          1. https://hackernoon.com/how-to-deploy-a-java-springboot-app-with-mysql-in-aws-for-free-dn3x34gg
          2. https://www.youtube.com/watch?v=jNh2_Sq1zy4
