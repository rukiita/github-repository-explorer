import { type IGithubRepository } from "./interface";
import {
  type Repository,
  type SearchResponse,
} from "@/lib/types/githubSchemas";

const generateId = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getMockData = (query: string) => {
  const createRepo = (
    id: number,
    name: string,
    fullName: string,
    owner: string
  ) => ({
    id,
    name,
    full_name: fullName,
    description: `Description for ${name}`,
    stargazers_count: 10000,
    watchers_count: 500,
    forks_count: 2000,
    open_issues_count: 100,
    language: "JavaScript",
    html_url: `https://github.com/${fullName}`,
    owner: {
      login: owner,
      avatar_url: "https://example.com/avatar.png",
      html_url: `https://github.com/${owner}`,
    },
    license: { name: "MIT" },
    updated_at: "2023-01-01T00:00:00Z",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let items: any[] = [];

  if (query.includes("react")) {
    items = [createRepo(1, "react", "facebook/react", "facebook")];
  } else if (query.includes("vue")) {
    items = [createRepo(2, "vue", "vuejs/vue", "vuejs")];
  } else if (query.includes("javascript")) {
    items = Array.from({ length: 30 }, (_, i) =>
      createRepo(
        100 + i,
        `javascript-repo-${i}`,
        `test-user/javascript-repo-${i}`,
        "test-user"
      )
    );
  }

  return {
    total_count: items.length,
    incomplete_results: false,
    items: items,
  };
};

export const mockGithubRepository: IGithubRepository = {
  fetchRepos: async ({ query }) => {
    return getMockData(query) as SearchResponse;
  },
  fetchRepoDetail: async (owner, repo) => {
    const fullName = `${owner}/${repo}`;
    const id = generateId(fullName);
    return {
      id,
      name: repo,
      full_name: fullName,
      description: "Mock Description for E2E",
      stargazers_count: 10000,
      watchers_count: 500,
      forks_count: 2000,
      open_issues_count: 100,
      language: "JavaScript",
      html_url: `https://github.com/${fullName}`,
      owner: {
        login: owner,
        avatar_url: "https://example.com/avatar.png",
        html_url: `https://github.com/${owner}`,
      },
      license: { name: "MIT" },
      updated_at: "2023-01-01T00:00:00Z",
    } as unknown as Repository;
  },
  fetchReadme: async () => {
    return "# Mock Readme content for E2E";
  },
};
