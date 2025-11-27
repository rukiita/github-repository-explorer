import { z } from "zod";

export const RepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(), 
  html_url: z.string().url(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  watchers_count: z.number(),
  open_issues_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string().url(),
    html_url: z.string().url(),
  }),
  license: z
    .object({
      name: z.string(),
    })
    .nullable()
    .optional(), 
});

export const SearchResponseSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(RepositorySchema),
});


export type Repository = z.infer<typeof RepositorySchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
