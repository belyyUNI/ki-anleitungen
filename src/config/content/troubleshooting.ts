import { z } from "astro:content";

export const troubleshootingSchema = z.object({
  title: z.string(),
  problem: z.string(),
  category: z.enum(["gpu", "docker", "comfyui", "modelle", "dgx", "cuda", "netzwerk", "speicher", "ssh", "python", "other"]),
  symptoms: z.array(z.string()).default([]),
  cause: z.string(),
  solution: z.string(),
  difficulty: z.enum(["anfanger", "fortgeschritten", "experte"]),
  errorMessages: z.array(z.string()).default([]),
  tags: z.array(z.string()).max(8).default([]),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  draft: z.boolean().default(false),
  readingTimeMinutes: z.number().optional(),
});
