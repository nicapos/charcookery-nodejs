import { z } from "zod";
import { ZodOpenApiResponseObject } from "zod-openapi";

const ZodIssue = z.object({
  code: z.string(),
  message: z.string(),
  fatal: z.boolean().optional(),
  path: z.array(z.string()).optional(),
});

export const ZodErrorResponse: ZodOpenApiResponseObject = {
  description: "Response query/body validation error",
  content: {
    "application/json": {
      schema: z
        .object({
          name: z.string(),
          issues: z.array(ZodIssue),
        })
        .openapi({
          example: {
            name: "ZodError",
            issues: [
              {
                code: "too_small",
                message: "String must contain at least 8 character(s)",
                path: ["password"],
              },
            ],
          },
        }),
    },
  },
};

export const UnauthorizedResponse: ZodOpenApiResponseObject = {
  description: "Unauthorized. Log in to access this route.",
  content: {
    "application/json": {
      schema: z.object({
        message: z.string().openapi({ example: "Unauthorized" }),
      }),
    },
  },
};

export const BadRequestResponse: ZodOpenApiResponseObject = {
  description: "Bad request",
  content: {
    "application/json": {
      schema: z.object({
        name: z.string(),
        code: z.string(),
        message: z.string(),
      }),
    },
  },
};

export const InternalErrorResponse: ZodOpenApiResponseObject = {
  description: "Internal server error",
};
