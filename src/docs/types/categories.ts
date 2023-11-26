import { z } from "zod";
import {
  CategorySchema,
  EditableCategorySchema,
} from "../../schemas/categories";

export const CreateCategorySchema = EditableCategorySchema.openapi({
  example: {
    title: "Category A",
  },
});

export const CategoryAPISchema = CategorySchema.openapi({
  example: {
    id: "pONJ4ETD5iu3sQE",
    title: "Category A",
    user_id: "9PxYKdW3sRfJgHmUnOlQ2xX7iTvAz1cE",
  },
});

export const CategoryListSchema = z.array(CategoryAPISchema).openapi({});
