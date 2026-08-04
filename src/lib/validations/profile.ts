import { z } from "zod";

export const profileUpdateSchema = z
  .object({
    display_name: z.string().trim().max(100).optional(),
    bio: z.string().trim().max(2000).optional(),
    location: z.string().trim().max(100).optional(),
    github: z.string().trim().max(200).optional(),
    email_public: z.string().trim().max(200).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one profile field is required",
  });

export const PROFILE_KEYS = [
  "display_name",
  "bio",
  "location",
  "github",
  "email_public",
] as const;
