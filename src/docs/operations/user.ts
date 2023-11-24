import { ZodOpenApiOperationObject } from "zod-openapi";
import {
  FirebaseUserSchema,
  LoginCredentialsSchema,
  TokenCredentialsSchema,
} from "../types";

export const signInOperation: ZodOpenApiOperationObject = {
  summary: "Sign in with email and password",
  tags: ["auth"],
  security: [],
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
    "400": {
      $ref: "#/components/responses/BadRequestResponse",
    },
    "422": {
      $ref: "#/components/responses/ZodErrorResponse",
    },
    "500": {
      $ref: "#/components/responses/InternalErrorResponse",
    },
  },
};

export const logoutOperation: ZodOpenApiOperationObject = {
  summary: "Log out",
  tags: ["auth"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  responses: {
    "204": {
      description: "Logged out successfully",
    },
    "500": {
      $ref: "#/components/responses/InternalErrorResponse",
    },
  },
};

export const createUserOperation: ZodOpenApiOperationObject = {
  summary: "Create a new user account",
  tags: ["user"],
  security: [],
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
    "400": {
      $ref: "#/components/responses/BadRequestResponse",
    },
    "422": {
      $ref: "#/components/responses/ZodErrorResponse",
    },
    "500": {
      $ref: "#/components/responses/InternalErrorResponse",
    },
  },
};
