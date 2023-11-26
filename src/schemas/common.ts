import { z } from "zod";

export const UserParamSchema = z.object({
  userId: z.string(),
});

export const IdParamSchema = z.object({
  id: z.string(),
});
