import { ZodOpenApiOperationObject } from "zod-openapi";
import {
  FirebaseUserSchema,
  LoginCredentialsSchema,
  TokenCredentialsSchema,
} from "../types";

export const signInOperation: ZodOpenApiOperationObject = {
  summary: "Sign in with email and password",
  tags: ["auth"],
  requestBody: {
    content: {
      "application/json": {
        schema: TokenCredentialsSchema,
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Successfully signed in",
      content: {
        "application/json": {
          schema: FirebaseUserSchema,
        },
      },
    },
  },
};

export const createUserOperation: ZodOpenApiOperationObject = {
  summary: "Create a new user account",
  tags: ["user"],
  requestBody: {
    content: {
      "application/json": {
        schema: LoginCredentialsSchema,
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "User account created successfully",
      content: {
        "application/json": {
          schema: FirebaseUserSchema,
        },
      },
    },
  },
};
