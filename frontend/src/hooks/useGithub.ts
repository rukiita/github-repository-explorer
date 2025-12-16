"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { repoQueries } from "@/lib/repositories/queries";

// Repository Search (infinite scroll)
export const useRepoSearch = (
  query: string,
  sort: string,
  lang: string,
  perPage: number = 30
) => {
  return useInfiniteQuery(repoQueries.search(query, sort, lang, perPage));
};

// Repository Detail
export const useRepository = (owner: string, repo: string) => {
  return useQuery(repoQueries.detail(owner, repo));
};

// README
export const useReadme = (owner: string, repo: string) => {
  return useQuery(repoQueries.readme(owner, repo));
};
