import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  name: z.string(),
  notes: z.string().nullable(),
  duration_mins: z.number(),
  cover_image: z.string(),
  instructions: z.array(z.string()),
  ingredients: z.array(z.string()),
  source_url: z.string().nullable(),
});

export const UserRecipeSchema = RecipeSchema.omit({ source_url: true }).extend({
  is_favorite: z.boolean().optional().default(false),
  user_id: z.string().optional(),
});

export const EditableRecipeSchema = z.object({
  is_favorite: z.boolean().optional(),
  notes: z.string().nullable().optional(),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
export type UserRecipeType = z.infer<typeof UserRecipeSchema>;
