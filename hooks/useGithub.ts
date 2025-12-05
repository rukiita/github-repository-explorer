"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGithubRepository } from "@/lib/repositories/github";
import { Repository } from "@/lib/githubSchemas";

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
  repoName: string,
  repoInitialData: Repository | null
) => {
  return useQuery({
    queryKey: ["repository", owner, repoName],
    queryFn: () => Promise.resolve(null),
    enabled: !!repoInitialData,
    initialData: repoInitialData,
    staleTime: Infinity,
  });
};

export const useReadme = (
  owner: string,
  repoName: string,
  readmeInitialData: string | null
) => {
  return useQuery({
    queryKey: ["readme", owner, repoName],
    queryFn: () => Promise.resolve(null),
    enabled: !!readmeInitialData,
    initialData: readmeInitialData,
    staleTime: Infinity,
  });
};
