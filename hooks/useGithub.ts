"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchReadme, fetchRepoDetail, fetchRepos } from "@/lib/api/github";

export const useRepoSearch = (
  query: string,
  sort: string,
  lang: string,
  perPage: number = 30
) => {
  console.log("useGithub");
  console.log("query", query);
  console.log("sort", sort);
  console.log("lang", lang);

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

export const useRepository = (owner: string, repo: string) => {
  console.log("useRepository")
  return useQuery({
    queryKey: ["repository", owner, repo],
    queryFn: () => fetchRepoDetail(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 5,
  });
};

export const useReadme = (owner: string, repo: string) => {
  console.log("useReadme is called");
  console.log("owner", owner);
  console.log("repo", repo);
  return useQuery({
    queryKey: ["readme", owner, repo],
    queryFn: () => fetchReadme(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 100,
  });
};
