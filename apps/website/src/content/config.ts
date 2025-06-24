import { defineCollection, z } from 'astro:content';

// Define schema for blog posts
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Colourfully Digital Foundation'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

// Define schema for programs
const programs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    duration: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog,
  programs,
};
