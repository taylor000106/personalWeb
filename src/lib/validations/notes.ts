import { z } from "zod";

export const noteCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  content: z.string().max(50000).default(""),
  tags: z.string().trim().max(200).default(""),
});

export const noteUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(200),
  content: z.string().max(50000).default(""),
  tags: z.string().trim().max(200).default(""),
});

export const idQuerySchema = z.object({
  id: z.string().uuid(),
});
