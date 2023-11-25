import { ZodOpenApiOperationObject } from "zod-openapi";

export const getCommunityRecipesOperation: ZodOpenApiOperationObject = {
  summary: "Get community recipes",
  tags: ["recipes"],
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
            $ref: "#/components/schemas/RecipeListSchema",
          },
        },
      },
    },
    "401": {
      $ref: "#/components/responses/UnauthorizedResponse",
    },
  },
};
