## Content
* [controllers](./controllers/) - contains files which defines callback functions for client requests.
* [docs](./docs/) - contains functions and modules for Swagger documentation for API endpoints.
* [middlewares](./middlewares/) - manages incoming requests, addressing tasks such as authentication, logging, and error handling before they reach route handlers.
* [schemas](./schemas/) - contains Zod schemas for data validation
* [services](./services/) - contains the core business logic of the app, encapsulating interactions with databases (such as Firestore), external APIs, or any other data-related operations
* [firebase.ts](./firebase.ts) – configures and manages the interaction with Firebase services, such as Authentication, Firestore, and Realtime Database.
* [index.ts](./index.ts) - The main entry point of the web application.
* [routes.ts](./routes.ts) - contains functions which describe the response of the server for each HTTP method request to a specific path in the server