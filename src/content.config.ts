import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    summary: z.string().max(160),
    live: z.string().url(),
    code: z.string().url().optional(),
    cover: image(),
    order: z.number(),
  }),
});

export const collections = {
  projects,
};

