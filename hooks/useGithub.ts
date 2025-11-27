import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/lib/api/github";

export const useRepoSearch = (query: string, sort: string, lang: string) => {
  return useInfiniteQuery({
    queryKey: ["repos", query, sort, lang] as const,
    queryFn: fetchRepos,
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