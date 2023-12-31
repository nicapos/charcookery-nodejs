import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

import router from "./routes";
import ErrorHandler from "./middlewares/errorHandler";
import TimeoutHandler from "./middlewares/timeoutHandler";
import swaggerDocs from "./docs/swagger";
import { json, urlencoded } from "body-parser";

dotenv.config();

const app = express();
const port = (process.env.PORT && parseInt(process.env.PORT)) || 3000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use("/api", router);
app.enable("trust proxy");
swaggerDocs(app, port);

// MIDDLEWARES
app.use(TimeoutHandler);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/*
  AWS Lambda Handler
  Reference: https://www.serverless.com/blog/serverless-express-rest-api/
*/
export const handler = serverless(app);
