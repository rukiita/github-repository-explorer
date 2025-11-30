import {
  Repository,
  RepositorySchema,
  SearchResponseSchema,
} from "../githubSchemas";

interface SearchParams {
  query: string;
  sort: string;
  lang: string;
  page: number;
  perPage?: number;
}

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

export const fetchRepos = async ({
  query,
  sort,
  lang,
  page = 1,
  perPage = 30,
}: SearchParams) => {
  if (!query) return { items: [], total_count: 0 };

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
};

export const fetchRepoDetail = async (
  owner: string,
  repo: string
): Promise<Repository | null> => {
  const res = await fetch(`/api/repos/${owner}/${repo}`);

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch repository detail");
  }

  const data = await res.json();
  return RepositorySchema.parse(data);
};

export const fetchReadme = async (owner: string, repo: string) => {
  console.log("fetcReadme is called");
  const res = await fetch(`/api/repos/${owner}/${repo}/readme`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch README");
  }
  return res.text();
};
