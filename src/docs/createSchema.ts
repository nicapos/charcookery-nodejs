import fs from "fs";
import path from "path";
import { stringify } from "yaml";
import { createDocument } from "zod-openapi";
import dotenv from "dotenv";

import { pingOperation } from "./operations/common";
import {
  createUserOperation,
  deleteAccountOperation,
  getAccountOperation,
  logoutOperation,
  requestPasswordOperation,
  sendVerificationEmailOperation,
  signInOperation,
  updateProfileOperation,
} from "./operations/user";
import { getCommunityRecipesOperation } from "./operations/recipes";
import {
  RecipeAPISchema,
  RecipeListSchema,
  FirebaseUserSchema,
  userTokensSchema,
  BadRequestResponse,
  UnauthorizedResponse,
  ZodErrorResponse,
  InternalErrorResponse,
  AccountAPISchema,
} from "./types";

dotenv.config();

const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "CharCookery API",
    version: "1.0.0",
    description:
      "A REST API backend for CharCookery, an Android project built as a course requirement for MOBDEVE.",
  },
  components: {
    schemas: {
      UserSchema: FirebaseUserSchema,
      TokensSchema: userTokensSchema,
      AccountSchema: AccountAPISchema,
      RecipeSchema: RecipeAPISchema,
      RecipeListSchema,
    },
    responses: {
      BadRequestResponse,
      UnauthorizedResponse,
      ZodErrorResponse,
      InternalErrorResponse,
    },
    securitySchemes: {
      OAuth2PasswordBearer: {
        type: "oauth2",
        flows: {
          password: {
            scopes: {},
            tokenUrl: "/api/token",
          },
        },
        description: "OAuth2 with Password Flow using email as the username",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local Dev Endpoint",
    },
  ],
  paths: {
    "/api/": {
      get: pingOperation,
    },
    "/api/token": {
      post: signInOperation,
    },
    "/api/auth/verify": {
      post: sendVerificationEmailOperation,
    },
    "/api/auth/logout": {
      post: logoutOperation,
    },
    "/api/user": {
      get: getAccountOperation,
      post: createUserOperation,
      put: updateProfileOperation,
      patch: requestPasswordOperation,
      delete: deleteAccountOperation,
    },
    "/api/recipe": {},
    "/api/recipes": {
      get: getCommunityRecipesOperation,
    },
  },
});

const yaml = stringify(document);

// eslint-disable-next-line no-sync
fs.writeFileSync(path.join(__dirname, "openapi.yml"), yaml);
