import { ZodOpenApiOperationObject } from "zod-openapi";
import {
  CreateRecipeSchema,
  EditableRecipeAPISchema,
  RecipeListSchema,
  UserRecipeListSchema,
} from "../types";

const getCommunityRecipesOperation: ZodOpenApiOperationObject = {
  summary: "Get community recipes",
  tags: ["recipes"],
  security: [],
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: RecipeListSchema,
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const getRecipesByUserOperation: ZodOpenApiOperationObject = {
  summary: "Get user recipes",
  description: "Fetch all recipes by a user given their user id",
  tags: ["recipes"],
  security: [],
  parameters: [
    {
      in: "path",
      name: "userId",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: UserRecipeListSchema,
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const getRecipeByIdOperation: ZodOpenApiOperationObject = {
  summary: "Get recipe",
  description: "Fetches a recipe given its id",
  tags: ["recipe"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserRecipeSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const addRecipeOperation: ZodOpenApiOperationObject = {
  summary: "Add recipe",
  description: "Creates a new user recipe",
  tags: ["recipe"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: CreateRecipeSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserRecipeSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const updateRecipeOperation: ZodOpenApiOperationObject = {
  summary: "Update recipe",
  description:
    "Updates the favorite status OR notes of a recipe. Recipe can only by updated by its owner. Prioritizes updating `favorite_status` over `notes`.",
  tags: ["recipe"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: EditableRecipeAPISchema,
      },
    },
  },
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserRecipeSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const deleteRecipeOperation: ZodOpenApiOperationObject = {
  summary: "Delete recipe",
  description:
    "Deletes a recipe given its id. Recipe can only by deleted by its owner.",
  tags: ["recipe"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  responses: {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserRecipeSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

export default {
  post: addRecipeOperation,
  getById: getRecipeByIdOperation,
  getByUser: getRecipesByUserOperation,
  getCommunity: getCommunityRecipesOperation,
  patch: updateRecipeOperation,
  delete: deleteRecipeOperation,
};
