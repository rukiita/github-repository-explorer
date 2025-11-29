"use client";
import Link from "next/link";
import RepoCard from "./repoCard";
import { useRepoSearch } from "@/hooks/useGithub";
import { Repository } from "@/lib/githubSchemas";
import { Skeleton } from "./ui/skeleton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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

  if (status === "pending") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }

  if (data?.pages[0].items.length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <>
      {data?.pages.map((page, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {page.items.map((repo: Repository) => (
            <Link
              key={repo.id}
              href={`/repos/${repo.owner.login}/${repo.name}`}
            >
              <RepoCard repo={repo} />
            </Link>
          ))}
        </div>
      ))}
      <div ref={ref} className="py-4 flex justify-center w-full">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </>
  );
}
