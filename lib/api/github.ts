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
