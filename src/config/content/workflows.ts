import { z } from "astro:content";

export const workflowSchema = z.object({
  title: z.string(),
  description: z.string().max(300),
  category: z.enum(["img2img", "txt2img", "inpainting", "controlnet", "upscaling", "video", "other"]),
  difficulty: z.enum(["anfanger", "fortgeschritten", "experte"]),
  comfyuiVersion: z.string().optional(),
  requiredNodes: z.array(z.string()).default([]),
  requiredModels: z.array(z.string()).default([]),
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
});
