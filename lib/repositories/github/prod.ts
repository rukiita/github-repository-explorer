import { IGithubRepository, SearchParams } from "./interface";
import { RepositorySchema, SearchResponseSchema } from "@/lib/githubSchemas";

export const prodGithubReposotory: IGithubRepository = {
  fetchRepos: async ({
    query,
    sort,
    lang,
    page,
    perPage = 30,
  }: SearchParams) => {
    if (!query) return { items: [], total_count: 0, incomplete_results: false };

    const params = new URLSearchParams({
      q: query,
      sort: sort || "",
      lang: lang || "",
      page: page.toString(),
      per_page: perPage.toString(),
    });

    const res = await fetch(`/api/github?${params.toString()}`);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return SearchResponseSchema.parse(data);
  },

  fetchRepoDetail: async (owner: string, repo: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/repos/${owner}/${repo}`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch repository detail");
    }

    const data = await res.json();
    return RepositorySchema.parse(data);
  },

  fetchReadme: async (owner: string, repo: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/repos/${owner}/${repo}/readme`;

    const res = await fetch(url);
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      const errorBody = await res.text().catch(() => "No error body");
      console.error(`[API Error] Failed to fetch README from ${url}`);
      console.error(`Status: ${res.status} ${res.statusText}`);
      console.error(`Body: ${errorBody}`);

      throw new Error(
        `Failed to fetch README: ${res.status} ${res.statusText}`
      );
    }
    return res.text();
  },
};
