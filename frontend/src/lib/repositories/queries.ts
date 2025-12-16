import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { prodGithubRepository } from "./prod";

// detailed query configurations for react-query
export const repoQueries = {
  all: () => ["repos"] as const,
  
  // detail information
  detail: (owner: string, repo: string) =>
    queryOptions({
      queryKey: ["repo", owner, repo],
      queryFn: () => prodGithubRepository.fetchRepoDetail(owner, repo),
      staleTime: 1000 * 60 * 5,
    }),

  // README
  readme: (owner: string, repo: string) =>
    queryOptions({
      queryKey: ["readme", owner, repo],
      queryFn: () => prodGithubRepository.fetchReadme(owner, repo),
      staleTime: 1000 * 60 * 60,
    }),

  // infinite search
  search: (query: string, sort: string, lang: string, perPage = 30) =>
    infiniteQueryOptions({
      queryKey: ["repos", query, sort, lang, perPage],
      queryFn: ({ pageParam = 1 }) =>
        prodGithubRepository.fetchRepos({
          query,
          sort,
          lang,
          page: pageParam as number,
          perPage,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any, allPages) => {
        const hasMore = lastPage.items?.length >= perPage;
        return hasMore ? allPages.length + 1 : undefined;
      },
      enabled: !!query,
      staleTime: 1000 * 60 * 5,
    }),
};