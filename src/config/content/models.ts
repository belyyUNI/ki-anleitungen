import { z } from "astro:content";

export const modelSchema = z.object({
  name: z.string(),
  type: z.enum(["checkpoint", "lora", "controlnet", "vae", "upscaler", "text-encoder", "llm", "other"]),
  category: z.enum(["stable-diffusion", "flux", "llm", "other"]),
  description: z.string().max(300),
  source: z.enum(["civitai", "huggingface", "replicate", "local", "other"]),
  downloadUrl: z.string().url().optional(),
  huggingfaceId: z.string().optional(),
  fileSize: z.string().optional(),
  vramRequirement: z.string().optional(),
  license: z.string().optional(),
  tags: z.array(z.string()).max(8).default([]),
  publishedAt: z.date(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});
