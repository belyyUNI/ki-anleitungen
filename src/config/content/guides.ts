import { z } from "astro:content";

export const guideSchema = z.object({
  title: z.string(),
  description: z.string().max(250),
  difficulty: z.enum(["anfanger", "fortgeschritten", "experte"]),
  topic: z.enum(["ssh", "docker", "comfyui", "dgx", "gpu", "modelle", "workflows", "allgemein"]),
  tags: z.array(z.string()).max(8).default([]),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  readingTimeMinutes: z.number().optional(),
});
