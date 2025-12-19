import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content', // v2.5.0+
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        author: z.string().default('Yainier Ruben'),
        authorImage: z.string().default('/profile_new.png'),
        image: z.string().optional(),
        tags: z.array(z.string()),
        category: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        githubUrl: z.string().optional(),
        liveUrl: z.string().optional(),
        image: z.string().optional(),
        order: z.number().optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
};
