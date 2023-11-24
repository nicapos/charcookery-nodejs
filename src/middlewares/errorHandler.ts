import { FirebaseError } from "@firebase/util";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export function handleError(res: Response, error: any) {
  let statusCode = 500; // Internal Server Error
  let responsePayload: any = {};

  if (error instanceof FirebaseError) {
    statusCode = 400;
    responsePayload = {
      name: error.name,
      code: error.code,
      message: error.message,
    };
  } else if (error instanceof ZodError) {
    statusCode = 422; // Unprocessable Entity
    responsePayload = {
      name: error.name,
      issues: error.issues,
    };
  } else {
    responsePayload = error;
  }

  res.status(statusCode).json(responsePayload);
}

const ErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(res, error);
};

export default ErrorHandler;
