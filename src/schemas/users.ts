import { z } from "zod";

export const AccountSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  photo_url: z.string().nullable(),
  dietary_restrictions: z.string().nullable(),
});

export const EditableAccountSchema = z.object({
  name: z.string().nullable(),
  photo_url: z.string().nullable(),
  dietary_restrictions: z.string().nullable(),
});

export const RequestPasswordChangeSchema = z.object({
  email: z.string().email(),
});

export type AccountType = z.infer<typeof AccountSchema>;
export type EditableAccountType = z.infer<typeof EditableAccountSchema>;
