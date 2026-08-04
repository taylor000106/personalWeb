import { z } from "zod";

const httpUrl = z
  .string()
  .trim()
  .max(2000)
  .url()
  .refine((value) => /^https?:\/\//i.test(value), {
    message: "URL must start with http:// or https://",
  });

export const linkCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  url: httpUrl,
  description: z.string().trim().max(1000).default(""),
});

export const linkIdQuerySchema = z.object({
  id: z.string().uuid(),
});
