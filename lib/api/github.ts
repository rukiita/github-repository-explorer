import { SearchResponseSchema } from "../githubSchemas";

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
  console.log("github data", data);

  return SearchResponseSchema.parse(data);
};
