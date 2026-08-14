import { z } from "zod";

export const todoCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
});

export const todoUpdateSchema = z.object({
  id: z.string().uuid(),
  done: z.boolean(),
});

export const todoIdQuerySchema = z.object({
  id: z.string().uuid(),
});
