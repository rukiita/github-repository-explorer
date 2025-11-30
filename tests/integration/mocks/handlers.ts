import { http, HttpResponse } from "msw";

// 1. Zodスキーマ (RepositorySchema) を通過できる完全なモックデータ
// これを使い回すことで、検索結果でも詳細でもエラーが出ないようにします
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
  license: { name: "MIT License" }, // nullableですが、ある体で定義
};

export const handlers = [
  // ---------------------------------------------------------
  // 1. 検索用 (fetchRepos)
  // URL: /api/github?q=...
  // ---------------------------------------------------------
  http.get("*/api/github", () => {
    return HttpResponse.json({
      total_count: 1,
      incomplete_results: false,
      items: [mockRepoData], // 上記のモックデータを配列に入れる
    });
  }),

  // ---------------------------------------------------------
  // 2. 詳細取得用 (fetchRepoDetail)
  // URL: /api/repos/:owner/:repo
  // ---------------------------------------------------------
  http.get("*/api/repos/:owner/:repo", ({ params }) => {
    const { owner, repo } = params;

    // パラメータに合わせて動的に少し書き換えて返すとリアルです
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
  // 3. README取得用 (fetchReadme)
  // URL: /api/repos/:owner/:repo/readme
  // ---------------------------------------------------------
  http.get("*/api/repos/:owner/:repo/readme", () => {
    // ★重要: クライアントコードが res.text() を期待しているので
    // JSONではなくプレーンテキストを返します。
    return new HttpResponse("# Mock Readme Content\n\nThis is a test readme.", {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }),
];
