import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchRepos = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<[string, string, string, string], number>) => {
  const [_, q, sort, lang] = queryKey; //destructuring of queryKey
  if (!q) return { items: [], total_count: 0 };
  const params = new URLSearchParams({
    q,
    sort: sort || "",
    lang: lang || "",
    page: pageParam.toString(),
  });
  const res = await fetch(`api/github?${params.toString()}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};
