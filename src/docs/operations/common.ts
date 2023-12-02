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

const imageUploadOperation: ZodOpenApiOperationObject = {
  summary: "Upload recipe image",
  tags: ["media"],
  security: [
    {
      OAuth2PasswordBearer: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            media: {
              type: "string",
              format: "base64",
            },
          },
        },
      },
    },
  },
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
  post: imageUploadOperation,
};
