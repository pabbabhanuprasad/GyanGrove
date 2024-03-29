# GyanGrove-assignment

# GitHub repository Link
https://github.com/pabbabhanuprasad/GyanGrove.git

# A brief report explaining your choice of tech stack and database, highlighting any particular design decisions and how challenges were addressed.

# Node.js with Express.js:

Selected for its clear syntax, efficiency in handling scalability, and reputation as one of the fastest programming languages for backend servers.

# MySQL:

MySQL database is used to manipulate the database, manipulation means add, read, update, and delete data in the database.

# RESTful API Design:

The endpoints are designed following RESTful principles, making them intuitive and easy to use api's.

# Input Validation:

Implemented validation if the user not giving any input value we are giving an error message

# Asynchronous Operations:

 I've used async/await and Promise-based APIs to handle asynchronous database operations efficiently in project.

# Error Handling:

Implemented whole project in MVC comcept, it used to handle the project in better way, It mainly used to debug the error easily reduce code complexity and look wise good.

# Challenges Addressed:

# Input Validation and Sanitization:

Ensured that all required fields are present and that latitude and longitude are numbers is required

# Asynchronous Operations Handling:

Effectively managed asynchronous operations using async/await and Promise-based APIs, ensuring easly execution and error handling.

# External API Integration:

Handled errors and exceptions gracefully when fetching data from external APIs, ensuring robustness and reliability in the face of network failures or API changes.

# Setting Up and Running the Project:

# Prerequisites:

Node.js and npm should be install in your project. You can download and install them from Node.js website.
MySQL database server should be install and connect the database with the nodeJS application which we are working on it.Once installation of mysql completed we need to
import in our application.
I've accessed the enviroment variables for external API's like weatherApiKey, distanceApiKey.

# Install Dependencies:

npm install

# Database Configuration:

Update the database configuration in databaseC.js file to connect to your MySQL database server.
Create the necessary database tables using SQL scripts provided.

# Environment Variables:

Create a .env file in the project root directory.
Add the required environment variables for external APIs (e.g., WEATHER_API_KEY, YOUR_DISTANCE_API_CODE).

# Run the Application:

nmp start

# API Endpoint Documentation:

Create Event Endpoint:

Endpoint: /events/create
Method: POST
Request Format:{
"event_name": "Event Name",
"city_name": "City Name",
"date": "YYYY-MM-DD",
"time": "HH:MM:SS",
"latitude": 123.456,  
 "longitude": 123.456  
}

# Response Format (Success):

Status Code: 201 OK
{
"message": "Event created successfully"
}

# Error Response Format:

Status Code: 400 Bad Request
{
"message": "The following fields are required: event_name, city_name, date, time, latitude, longitude"
}

Status Code: 500 Internal Server Error
{
"message": "Internal Server Error"
}

# Find Event Endpoint:

Endpoint:/event/find
Method: GET
Query Parameters:
page (optional): Page number for pagination
Request Format:{
"latitude": 123.456,  
 "longitude": 123.456,  
 "date": "YYYY-MM-DD"  
}

# Response Format (Success):

Status Code: 200 OK
{
"events": [
{
"event_name": "Event Name",
"city_name": "City Name",
"time": "HH:MM:SS",
"date": "YYYY-MM-DD",
"latitude": 123.456,
"longitude": 123.456,
"weather": "Weather Condition",
"distance_km": 123.45
},
events...
],
"page": 1,
"pageSize": 10,
"totalEvents": 100,
"totalPages": 10
}

# Error Response Format:

Status Code: 400 Bad Request
{
"message": "Error message describing the issue"
}
Status Code: 422 "Unprocessable Entity"
{
"message": "Internal Server Error"
}
