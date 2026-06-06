import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const membersCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/members',
  }),
  schema: z.object({
    name: z.string().min(1),
    role: z.enum([
      'Principal Investigator',
      'Co-Investigator',
      'Postdoctoral Researcher',
      'PhD Scholar',
      'MS Student',
      'Research Engineer',
      'Undergraduate Researcher',
      'Visiting Researcher',
      'Alumni',
      'Intern'
    ]),
    bio: z.string().min(10),
    email: z.string().email().optional(),
    joinYear: z.number().int().min(2000).max(new Date().getFullYear() + 1),

    avatar: z.string().optional(),
    github: z.string().url().optional(),
    googleScholar: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),

    interests: z.array(z.string()).default([]),
    order: z.number().int().default(99),
    isAlumni: z.boolean().default(false),
  }),
});

const publicationsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{json,yaml,yml}',
    base: './src/content/publications',
  }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string()).min(1),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 2),
    venue: z.string().min(1),
    type: z.enum([
      'conference',
      'journal',
      'preprint',
      'workshop',
      'book-chapter',
    ]),

    url: z.string().url().optional(),
    pdfUrl: z.string().url().optional(),
    projectUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
    abstract: z.string().optional(),
    award: z.string().optional(),
    arxivId: z.string().optional(),
    doi: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const researchCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/research',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(20),
    order: z.number().int().default(99),

    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    updatedDate: z.coerce.date().optional(),

    relatedPapers: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  members: membersCollection,
  publications: publicationsCollection,
  research: researchCollection,
};