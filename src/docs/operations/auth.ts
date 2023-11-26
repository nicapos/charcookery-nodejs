import { ZodOpenApiOperationObject } from "zod-openapi";
import { TokenCredentialsSchema } from "../types";

const signInOperation: ZodOpenApiOperationObject = {
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

const sendVerificationEmailOperation: ZodOpenApiOperationObject = {
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

const logoutOperation: ZodOpenApiOperationObject = {
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

export default {
  postIn: signInOperation,
  postVerify: sendVerificationEmailOperation,
  postOut: logoutOperation,
};
