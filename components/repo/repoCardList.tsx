"use client";
import Link from "next/link";
import RepoCard from "../repo/repoCard";
import { useRepoSearch } from "@/hooks/useGithub";
import { Repository } from "@/lib/githubSchemas";
import { Skeleton } from "../ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import RepoListView from "./repoListView";

interface RepoCardListProps {
  query: string;
  sortBy: string;
  language: string;
}

export default function RepoCardList({
  query,
  sortBy,
  language,
}: RepoCardListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useRepoSearch(query, sortBy, language);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const flatRepositories = data?.pages.flatMap((page) => page.items) || [];

  return (
    <>
      <RepoListView
        isLoading={status === "pending"}
        isError={status === "error"}
        errorMessage={error instanceof Error ? error.message : ""}
        repositories={flatRepositories}
        isFetchingNextPage={isFetchingNextPage}
        scrollTriggerRef={ref}
      />
    </>
  );
}
