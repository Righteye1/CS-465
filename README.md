Architecture 

This full stack application uses two approaches for frontend development the Express HTML site and an Angular single-page application. The customer-facing site uses Handlebars for templating, while the admin panel leverages Angular’s components and services to create dynamic, responsive pages. The SPA provides a more seamless user experience by avoiding full page reloads and supporting CRUD operations on trips directly in the browser. 

The backend uses a NoSQL MongoDB database because its schema less design provides flexibility in storing varying trip data formats. It also integrates well with the Mongoose library for easy model definition and validation. 

Functionality 

JSON is a lightweight data format used for communication between frontend and backend systems. Unlike JavaScript, which is a programming language, JSON is purely a data exchange format. It ties the app together by transporting data from the server to the client. 

Throughout the project, I refactored code for better functionality converting static HTML to HBS templates, extracting Angular components like TripCardComponent, and modularizing the Express API. These changes led to cleaner code and reusable components, improving maintainability and scalability. 

Testing 

To test API methods (GET, POST, PUT, DELETE), I used Postman to verify responses and error handling. Once authentication was added, I tested endpoints by including JWT tokens in the request headers. I encountered and resolved errors like token mismatch and 401 Unauthorized, ensuring that protected routes work securely. 

Reflection 

This course helped solidify my understanding of full stack development. I learned how to structure apps using the MEAN stack and implement features from templating to secure authentication. I also gained hands-on experience debugging real-world issues, like cross origin errors and protected endpoint failures. These skills make me a stronger developer and more marketable for backend or full stack roles in the field. 
