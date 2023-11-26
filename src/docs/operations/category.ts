import { ZodOpenApiOperationObject } from "zod-openapi";
import { CategoryListSchema, CreateCategorySchema } from "../types/categories";

const addCategoryOperation: ZodOpenApiOperationObject = {
  summary: "Add category",
  description: "Creates a new user category",
  tags: ["category"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: CreateCategorySchema,
      },
    },
  },
  responses: {
    "201": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CategorySchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const getCategoriesByUserOperation: ZodOpenApiOperationObject = {
  summary: "Get user categories",
  description: "Fetch all categories by a user given their user id",
  tags: ["categories"],
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
          schema: CategoryListSchema,
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const getCategoryByIdOperation: ZodOpenApiOperationObject = {
  summary: "Get category",
  description: "Fetches a category given its id",
  tags: ["category"],
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
            $ref: "#/components/schemas/CategorySchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};

const deleteCategoryByIdOperation: ZodOpenApiOperationObject = {
  summary: "Delete category",
  description:
    "Deletes a category given its id. Category can only by deleted by its owner.",
  tags: ["category"],
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
            $ref: "#/components/schemas/CategorySchema",
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
  post: addCategoryOperation,
  getByUser: getCategoriesByUserOperation,
  getById: getCategoryByIdOperation,
  delete: deleteCategoryByIdOperation,
};
