import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(4),
  user_id: z.string(),
});

export const EditableCategorySchema = CategorySchema.omit({
  id: true,
  user_id: true,
});

export type CategoryType = z.infer<typeof CategorySchema>;
