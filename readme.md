# js-backend-project-real-estate-agency
JS Back-End Project - Real Estate Agency

1.	Exam Rules:
1.	You have 4 hours 
2.	When you are ready, delete the node_modules folder, make sure all dependencies are listed in the package.json file and submit your archived project.
3.	You are provided with HTML & CSS resources 
4.	You may add attributes (such as class and dataset), but it is forbidden to change existing attributes (such as class and id)
5.	You may change "href" attributes on links and add/change the method and action attributes of HTML Forms.
6.	Use Express.js as a back-end framework
7.	Use MongoDB as a database with mongoose
8.	You can use whatever view engine you like (express-handlebars, EJS, Pug etc.…)
9.	Use bcrypt for hashing the password
10.	The application must start from file "index.js" on port 3000
11.	It is forbidden to use React, Vue, Angular etc.

2.	Application Overview
Get acquainted with the provided HTML and CSS and create an application for a real estate agency. 
The visitors can view the Home page and Housing for rent catalog with available offers, they can also register with a name, username, and password, which will allow them to create their own offers for housing, rent a home(if the current user is not the owner of the housing offer and if there are vacant housing). Authors can edit or delete posts at any time.

3.	Functional Requirements
Guest (not logged in)
The application should provide Guest (not logged in) users with the functionality to login, register, view the Home page, Housing for rent page and the Details page.
Users (logged in)
The application should provide Users (logged in) with the functionality to:
•	View Home page and all other pages with logged-in navigation
•	View  Housing for rent
•	Create а new housing offer  [Create Offer]
•	Access housing details page [Details]
•	Renting a home (if the current user is not the owner of the housing offer and if there are vacant housing)
•	Delete or Edit housing depending on user's authentication (only for owner of the current offer for housing)

4.	Database Models 
The Database of the Real Estate Agency application needs to support 2 entities:
User
•	Name - string (required),
•	Username - string (required),
•	Password - string (required)

 Housing
•	Name - string (required),
•	Type - string (“Apartment”, “Villa”, “House”) required,
•	Year - number (required),
•	City – string (required),
•	Home Image - string (required),
•	Property Description - string (required),
•	Available pieces - number(required)
•	Rented a home - a collection of Users (reference to the User model)
•	Owner - object Id (reference to the User model)
Note:  When a user rents a home, their id is added to that collection (Rented a home)
Implement the entities with the correct data types.

5.	Application Pages (80 pts)
Home Page (For logged in users and logged-out users) 
Visualize the last 3 added housing offers. Each offer must show information about the home Image, the name, as well as a page with details about the specific housing (the [Detail] button will be visible when the mouse cursor reaches the image of the housing).
If there are NO housing offers in the database yet, display "There are no housing offers found…"

Register Page (Logged Out User)
Register a user inside the database with name, username, and password. Password inside the database must be hashed (use bcrypt) and both passwords must match! After successful registration, you should redirect to Home page.

Login Page (Logged Out User) - (5 Pts)
Logging an already registered user with the correct username and password. After successful login, you should redirect to Home page.

Logout (logged in user)
The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to Home page.

Housing for rent (For logged in users and logged out users)
List all housing offers. Each home must display information about the home Image, the name, the description, as well as a page with details about the specific housing (the [Detail] button will be visible when the mouse cursor reaches the image of the housing). As in the picture below:

[Details] button should be a link to the details page for the current home.
If there are NO housing offers in the database yet, display "There are no housing offers found... "

Details Page - (for logged in users and logged out users)
All users should be able to see details of the home. Clicking the Details button in the housing card should display the details page. If the currently registered user is the creator of the housing offer, the Edit and Delete buttons should be displayed, otherwise they should not be available.
Information about the housing:
•	Name
•	Type
•	Year
•	City
•	Home Image
•	Description
•	Available pieces
•	People rented this housing
o	If any, separate their names with comma and space ", "
o	If not, display "There are no tenants yet.
•	Buttons (Depending the status of the currently logged in user)

Details Page (logged out users)
If there are no logged in user, no buttons should be displayed.

Details Page (logged in user and creator of the current offer)
If the currently logged-in user is the owner (the user who created the home offer), he should see the [Delete] and [Edit] buttons.


Details Page (logged in user with available places)
If the currently logged in user is not the owner (a user who is not the creator of this housing offer) and has not rented that housing, he should see a button like [Rent a home, available {available pieces} housing]. If there is at least 1 place left.

Details Page (logged in user already rented this housing)
If the currently logged in user is not the owner and has already rented the current home, he should see [You have already rent this home].

Details Page (logged in user with no available pieces)
If the currently logged-in user is not the owner and there are no available pieces for rent housing, he should see the [No Housing Available!].

Rent Housing (logged in user which is not the current housing owner)
Any registered user who is not the current owner of the housing offer must be able to rent a home (if any). 
If he manages to rent successfully the housing, his userId must be added to the collection of Rented a home, and the available pieces should be reduced by 1 and redirect the user to the Details page for the current housing offer.
Then in the list-People have rented this apartment, the names of the tenants should be displayed, and the available pieces for the apartment should be reduced by 1 and redirect the user to the page with details of the housing offer. 
If a user has once rented a current home, he should see "You have already rent this home" and in the list-People have rented this apartment, his name should be displayed.
If there are no available pieces for rent housing, he should see the "No Housing Available!".

Create Offer (Logged in User) 
The Create Offer page is available to logged-in users. It contains a form for adding new home. Upon success, redirect the user to the Housing for rent page.


Delete Home (logged in user and owner of the current offer for home) 
Each owner of the housing offer must be able to click on the [Delete] button and delete the current home from the database and the user must be redirected to the Housing for rent page.

Edit Home (logged in user and owner of the current offer for home) 
Each owner can edit their housing offer. Clicking the [Edit] button for a specific home on the details page should display the Edit page, all fields being populated with housing data. It contains a form with input fields for all relevant properties. If successful, redirect the user to the current housing details page.


6.	Security Requirements (Routes Guards) - (10 Pts)
The Security Requirements are mainly access requirements. Configurations about which users can access specific functionalities and pages.
•	Guest (not logged in) users can access Home page.
•	Guest (not logged in) users can access Login page and functionality.
•	Guest (not logged in) users can access Register page and functionality.
•	Guest (not logged in) and Users (logged in) can access Housing for rent page (Listed all homes).
•	Guest (not logged in) can access the Details page without functionality.
•	Users (logged in) can access Home page.
•	Users (logged in) can access Details page and functionality.
o	Users (not home offer owner) can Rent a house.
o	Users (home offer owner) can Edit and Delete the current home
•	Users (logged in) can access Create Offer page and functionality.
•	Users (logged in) can access Logout functionality.
Use the following view for invalid paths: Display page 404

7.	Validation and Error Handling (10 Pts)
The application should notify the users about result of their actions.
In case of error, you should display div with class “errorContainer”
You can choose to display the first error or all of them. You have complete freedom to choose the content of the error message you will display.
Login / Register
You should make the following validations:
•	The name should be in the following format -> (firstname lastname) - "Alexandur Petrov" 
•	The username should be at least 5 characters long
•	The password should be at least 4 characters long
•	The repeat password should be equal to the password

Housing
You should make the following validations while creating or editing a home:
•	The Name should be at least 6 characters
•	The Year should be between 1850 and 2021
•	The City should be at least 4 characters long
•	The Home Image should starts with http:// or https://.
•	The Property Description should be a maximum of 60 characters long.
•	The Available Pieces should be positive number (from 0 to 10)


* Bonus – Search (10 Pts)
Search for housing. Filter all matches by housing type, which includes a search string (case insensitive).

After click on [Search] button and If there are any matching matches from the search, show each of them.

If there are no search matches, display: „No match was found for the submitted type...“

8.	Submitting Your Solution
Place in a ZIP file your project folder. Exclude the node_modules folder. Upload the archive to Judge.
