import { type Repository } from "@/lib/types/githubSchemas";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import RepoCard from "./repoCard";
import { type Ref } from "react";

interface RepoListViewProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  repositories: Repository[];
  isFetchingNextPage: boolean;
  scrollTriggerRef?: Ref<HTMLDivElement>;
}

export default function RepoListView({
  isLoading,
  isError,
  errorMessage,
  repositories,
  isFetchingNextPage,
  scrollTriggerRef,
}: RepoListViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }
  if (isError) {
    return <div className="text-red-500">Error: {errorMessage}</div>;
  }

  if (repositories.length === 0) {
    return <div>No repositories found.</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {repositories.map((repo: Repository) => (
          <Link key={repo.id} href={`/repos/${repo.owner.login}/${repo.name}`}>
            <RepoCard repo={repo} />
          </Link>
        ))}
      </div>

      <div ref={scrollTriggerRef} className="py-4 flex justify-center w-full">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </>
  );
}
