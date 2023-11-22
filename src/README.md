## Content
* [controllers](./controllers/) - contains files which defines callback functions for client requests.
* [middlewares](./middlewares/) - includes middleware functions used to intercept and process incoming requests before they reach the route handlers. Common use cases include authentication, logging, and error handling.
* [utils](./utils/) - contains utility functions and modules, including Swagger documentation for API endpoints.
* [firebase.ts](./firebase.ts) – configures and manages the interaction with Firebase services, such as Authentication, Firestore, and Realtime Database.
* [index.ts](./index.ts) - The main entry point of the web application.
* [routes.ts](./routes.ts) - contains files which describes the response of the server for each HTTP method request to a specific path in the server.