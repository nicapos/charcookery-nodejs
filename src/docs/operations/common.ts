import { ZodOpenApiOperationObject } from "zod-openapi";

const pingOperation: ZodOpenApiOperationObject = {
  summary: "Check API status",
  security: [],
  responses: {
    "200": {
      description: "API is up and running",
    },
    "500": {
      $ref: "#/components/responses/InternalErrorResponse",
    },
  },
};

export default {
  get: pingOperation,
};
