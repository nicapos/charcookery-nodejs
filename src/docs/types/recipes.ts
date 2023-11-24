import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  notes: z.string().nullable(),
  duration_mins: z.number(),
  cover_image: z.string(),
  instructions: z.array(z.string()),
  ingredients: z.array(z.string()),
  source_url: z.string().nullable(),
});
