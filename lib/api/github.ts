interface SearchParams {
  query: string;
  sort: string;
  lang: string;
  page: number;
}

export const fetchRepos = async ({
  query,
  sort,
  lang,
  page = 1,
}: SearchParams) => {
  if (!query) return { items: [], total_count: 0 };

  const params = new URLSearchParams({
    q: query,
    sort: sort || "",
    lang: lang || "",
    page: page.toString(),
  });

  const res = await fetch(`/api/github?${params.toString()}`);
  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
};
