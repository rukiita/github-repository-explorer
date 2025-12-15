"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGithubRepository } from "@/lib/repositories/index";
import type { Repository } from "@/lib/types/githubSchemas";

export const useRepoSearch = (
  query: string,
  sort: string,
  lang: string,
  perPage: number = 30
) => {
  return useInfiniteQuery({
    queryKey: ["repos", query, sort, lang, perPage] as const,
    queryFn: ({ pageParam = 1 }) =>
      getGithubRepository().fetchRepos({
        query,
        sort,
        lang,
        page: pageParam,
        perPage,
      }),
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

export const useRepository = (
  owner: string,
  repo: string,
  repoInitialData: Repository | null
) => {
  return useQuery({
    queryKey: ["repository", owner, repo],
    queryFn: () => getGithubRepository().fetchRepoDetail(owner, repo),
    enabled: !!owner && !!repo,
    initialData: repoInitialData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useReadme = (
  owner: string,
  repo: string,
  readmeInitialData: string | null
) => {
  return useQuery({
    queryKey: ["readme", owner, repo],
    queryFn: () => getGithubRepository().fetchReadme(owner, repo),
    enabled: !!owner && !!repo,
    initialData: readmeInitialData,
    staleTime: 1000 * 60 * 100,
  });
};
