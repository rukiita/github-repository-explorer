import { SearchResponse, SearchResponseSchema } from "../githubSchemas";

interface SearchParams {
  query: string;
  sort: string;
  lang: string;
  page: number;
  perPage?: number;
}

interface ReadmeParams {
  owner: string;
  repo: string;
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
  console.log("github data", data);

  return SearchResponseSchema.parse(data);
};

export const fetchReadme = async ({ owner, repo }: ReadmeParams) => {
  const res = await fetch(`/api/repos/${owner}/${repo}/readme`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch README");
  }
};
