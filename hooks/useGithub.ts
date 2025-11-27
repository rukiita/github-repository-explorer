import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/lib/api/github";

export const useRepoSearch = (
  query: string,
  sort: string,
  lang: string,
  perPage: number = 30
) => {
  return useInfiniteQuery({
    queryKey: ["repos", query, sort, lang, perPage] as const,
    queryFn: ({ pageParam = 1 }) =>
      fetchRepos({ query, sort, lang, page: pageParam, perPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.items?.length >= 30;
      return hasMore ? allPages.length + 1 : undefined;
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
