import { ZodOpenApiOperationObject } from "zod-openapi";

export const pingOperation: ZodOpenApiOperationObject = {
  summary: "Check API status",
  responses: {
    "200": {
      description: "API is up and running",
    },
  },
};
