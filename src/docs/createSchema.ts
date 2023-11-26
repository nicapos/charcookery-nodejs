import fs from "fs";
import path from "path";
import { stringify } from "yaml";
import { createDocument } from "zod-openapi";
import dotenv from "dotenv";

import {
  RecipeAPISchema,
  FirebaseUserSchema,
  AccountAPISchema,
  UserRecipeAPISchema,
} from "./types";
import {
  BadRequestResponse,
  UnauthorizedResponse,
  ZodErrorResponse,
  InternalErrorResponse,
} from "./types/responses";
import { CategoryAPISchema } from "./types/categories";
import AuthOperations from "./operations/auth";
import CategoryOperations from "./operations/category";
import CommonOperations from "./operations/common";
import RecipeOperations from "./operations/recipes";
import UserOperations from "./operations/user";

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
      AccountSchema: AccountAPISchema,
      RecipeSchema: RecipeAPISchema,
      UserRecipeSchema: UserRecipeAPISchema,
      CategorySchema: CategoryAPISchema,
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
      get: CommonOperations.get,
    },
    "/api/token": {
      post: AuthOperations.postIn,
    },
    "/api/auth/verify": {
      post: AuthOperations.postVerify,
    },
    "/api/auth/logout": {
      post: AuthOperations.postOut,
    },
    "/api/user": {
      get: UserOperations.get,
      post: UserOperations.post,
      put: UserOperations.put,
      patch: UserOperations.patch,
      delete: UserOperations.delete,
    },
    "/api/recipe": {
      post: RecipeOperations.post,
    },
    "/api/recipe/{id}": {
      get: RecipeOperations.getById,
      patch: RecipeOperations.patch,
      delete: RecipeOperations.delete,
    },
    "/api/recipes": {
      get: RecipeOperations.getCommunity,
    },
    "/api/recipes/{userId}": {
      get: RecipeOperations.getByUser,
    },
    "/category": {
      post: CategoryOperations.post,
    },
    "/category/{id}": {
      get: CategoryOperations.getById,
      delete: CategoryOperations.delete,
    },
    "/categories/{userId}": {
      get: CategoryOperations.getByUser,
    },
  },
});

const yaml = stringify(document);

// eslint-disable-next-line no-sync
fs.writeFileSync(path.join(__dirname, "openapi.yml"), yaml);
