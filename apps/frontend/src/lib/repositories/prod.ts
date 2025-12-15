import { client } from "../client";
import type { IGithubRepository, SearchParams } from "./interface";

export const prodGithubRepository: IGithubRepository = {
  fetchRepos: async ({
    query,
    sort,
    lang,
    page = 1,
    perPage = 30,
  }: SearchParams) => {
    const res = await client.api.search.$get({
      query: {
        q: query,
        sort: sort || "best-match",
        lang: lang || "",
        page: page.toString(),
        per_page: perPage.toString(),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch repositories");
    }

    return await res.json();
  },

  fetchRepoDetail: async (owner: string, repo: string) => {
    const res = await client.api.repos[":owner"][":repo"].$get({
      param: { owner, repo },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch repository detail");
    }

    return await res.json();
  },

  fetchReadme: async (owner: string, repo: string) => {
    const res = await client.api.repos[":owner"][":repo"].readme.$get({
      param: { owner, repo },
    });
    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch readme");
    }

    return await res.text();
  },
};
