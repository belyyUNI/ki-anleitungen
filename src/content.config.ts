import { defineCollection } from "astro:content";
import { guideSchema } from "@config/content/guides";
import { modelSchema } from "@config/content/models";
import { workflowSchema } from "@config/content/workflows";
import { troubleshootingSchema } from "@config/content/troubleshooting";

export const collections = {
  guides: defineCollection({
    type: "content",
    schema: guideSchema,
  }),
  modelle: defineCollection({
    type: "content",
    schema: modelSchema,
  }),
  workflows: defineCollection({
    type: "content",
    schema: workflowSchema,
  }),
  troubleshooting: defineCollection({
    type: "content",
    schema: troubleshootingSchema,
  }),
};
