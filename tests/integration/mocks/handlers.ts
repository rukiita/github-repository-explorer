import { http, HttpResponse } from "msw";

// 1. Complete mock data that passes the Zod schema (RepositorySchema)
// This data is reused to prevent errors in both search results and detail views.
const mockRepoData = {
  id: 1,
  name: "react",
  full_name: "facebook/react",
  description:
    "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  html_url: "https://github.com/facebook/react",
  stargazers_count: 200000,
  forks_count: 40000,
  watchers_count: 6000,
  open_issues_count: 500,
  language: "JavaScript",
  updated_at: "2024-01-01T00:00:00Z",
  owner: {
    login: "facebook",
    avatar_url: "https://github.com/facebook.png",
    html_url: "https://github.com/facebook",
  },
  license: { name: "MIT License" }, // Defined with an assumed value (nullable)
};

export const handlers = [
  // ---------------------------------------------------------
  // 1. For Search (fetchRepos)
  // URL: /api/github?q=...
  // ---------------------------------------------------------
  http.get("http://localhost:3000/api/github", () => {
    return HttpResponse.json({
      total_count: 1,
      incomplete_results: false,
      items: [mockRepoData],
    });
  }),

  // ---------------------------------------------------------
  // 2. For Fetching Details (fetchRepoDetail)
  // URL: /api/repos/:owner/:repo
  // ---------------------------------------------------------
  http.get("http://localhost:3000/api/repos/:owner/:repo", ({ params }) => {
    const { owner, repo } = params;

    // Dynamically rewrite and return based on parameters for realism
    return HttpResponse.json({
      ...mockRepoData,
      name: repo,
      full_name: `${owner}/${repo}`,
      owner: {
        ...mockRepoData.owner,
        login: owner,
      },
    });
  }),

  // ---------------------------------------------------------
  // 3. For Fetching README (fetchReadme)
  // URL: /api/repos/:owner/:repo/readme
  // ---------------------------------------------------------
  http.get("http://localhost:3000/api/repos/:owner/:repo/readme", () => {
    return new HttpResponse("# React Readme Content\n\nThis is a test readme.", {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }),
];
