import { ZodOpenApiOperationObject } from "zod-openapi";
import {
  EditableAccountAPISchema,
  LoginCredentialsSchema,
  TokenCredentialsSchema,
} from "../types";
import { RequestPasswordChangeSchema } from "../../schemas/users";

export const signInOperation: ZodOpenApiOperationObject = {
  summary: "Sign in",
  description: "Log-in using email (as username) and password",
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
          schema: {
            $ref: "#/components/schemas/UserSchema",
          },
        },
      },
    },
    "400": {
      $ref: "#/components/responses/BadRequestResponse",
    },
    "422": {
      $ref: "#/components/responses/ZodErrorResponse",
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
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export const createUserOperation: ZodOpenApiOperationObject = {
  summary: "Create account",
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
          schema: {
            $ref: "#/components/schemas/UserSchema",
          },
        },
      },
    },
    "400": {
      $ref: "#/components/responses/BadRequestResponse",
    },
    "422": {
      $ref: "#/components/responses/ZodErrorResponse",
    },
  },
};

export const getAccountOperation: ZodOpenApiOperationObject = {
  summary: "Get user profile",
  description: "Get the active user's profile details (requires login)",
  tags: ["user"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AccountSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export const updateProfileOperation: ZodOpenApiOperationObject = {
  summary: "Update user profile",
  description: "Update active user's profile details (requires login)",
  tags: ["user"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: EditableAccountAPISchema,
      },
    },
  },
  responses: {
    "200": {
      description: "Updated successfully",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AccountSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export const requestPasswordOperation: ZodOpenApiOperationObject = {
  summary: "Request password change",
  tags: ["user"],
  description:
    "Lets the active user request for a password change (requires login). An email will be sent to their email if successful. The email provided in the request must match the active user's email.",
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: RequestPasswordChangeSchema,
      },
    },
  },
  responses: {
    "200": {
      description: "Updated successfully",
      content: {
        "application/json": {
          example: {
            message: "Password reset link sent to your email.",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export const deleteAccountOperation: ZodOpenApiOperationObject = {
  summary: "Delete account",
  description: "Deletes the active user's account (requires login)",
  tags: ["user"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  responses: {
    "204": {
      description: "Account deleted successfully",
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export const sendVerificationEmailOperation: ZodOpenApiOperationObject = {
  summary: "Send verification email",
  description:
    "Send verification email to the active user's email (requires login)",
  tags: ["auth"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  responses: {
    "200": {
      description: "Verification email sent",
      content: {
        "application/json": {
          example: {
            message: "Verification email sent",
          },
        },
      },
    },
    "400": {
      description: "Bad request",
      content: {
        "application/json": {
          example: {
            message: "Account is already verified",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};
