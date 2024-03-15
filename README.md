# moviemart-node-server-app
This is server side for https://moviemart.netlify.app

For client side, refer to https://github.com/mingyue21/moviemart-react-web-app

MovieMart is a web application that allows users to search and browse movies, view movie details, and purchase movie tickets. The application is designed to provide a seamless and user-friendly experience to its customers.

## Features
* Account Management
  * Register
  * Login
* Anonymous User (Applicatble to all user types)
  * Browse movies ranked by bookmark counts
  * Search movies through external APIs
  * View movie details including release year, popularity, overview
  * View other user profile
* Regular User (Applicable to all registered users)
  * Bookmark movies
  * Book tickets
  * Update profile
* Admin
  * Add movies
  * Approve theaters
* Theater Owner
  * Add theaters
  * Add shows

## Technologies Used

The MovieMart application was built using the following technologies:

*   Frontend: React, Redux
*   Backend: Node.js, Express.js
*   Database: MongoDB
*   Payment processing: Stripe

## System Architecture

The MovieMart application is designed with a client-server architecture. The frontend is built with React and Redux, and communicates with the backend server via HTTP RESTful APIs. The backend is built with Node.js and Express, and uses MongoDB as the database to store movie and user information.

The payment processing is handled by Stripe, a third-party payment gateway that provides a secure and reliable payment solution. When a user purchases a movie ticket, the payment information is sent to Stripe for processing, and the transaction status is returned to the application.

## Future Development
The MovieMart team is committed to continuously improving the application and adding new features. Some of the planned features for future releases include:

Integration with social media platforms to share movie reviews and ratings
Personalized movie recommendations based on viewing history and preferences
Improved search functionality with autocomplete and filters
Integration with more payment gateways to provide more payment options
Partnership with more movie theaters to offer a wider selection of movies and showtimes

## Conclusion
The MovieMart application is a modern and user-friendly web application that provides a one-stop shop for movie lovers. With its powerful search and browsing features, comprehensive movie details, and easy ticket purchasing, MovieMart is the ultimate destination for movie enthusiasts. The application is constantly evolving and improving to meet the changing needs of its users, and the MovieMart team is committed to providing the best possible movie experience for its customers.
