import fs from "fs";
import path from "path";
import { stringify } from "yaml";
import { createDocument } from "zod-openapi";
import dotenv from "dotenv";

import { pingOperation } from "./operations/common";
import { createUserOperation, signInOperation } from "./operations/user";
import { FirebaseUserSchema, userTokensSchema } from "./types";

dotenv.config();

import { SecurityRequirementObject } from "zod-openapi/lib-types/openapi3-ts/dist/oas30";

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
    "/api/user": {
      post: createUserOperation,
    },
    "/api/recipe": {},
    "/api/recipes": {},
  },
});

const yaml = stringify(document);

// eslint-disable-next-line no-sync
fs.writeFileSync(path.join(__dirname, "openapi.yml"), yaml);