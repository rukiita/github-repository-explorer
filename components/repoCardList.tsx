"use client";
import Link from "next/link";
import RepoCard from "./repoCard";
import { useRepoSearch } from "@/hooks/useGithub";

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
  return (
    <>
      {data?.pages.map((page, i) => {
        <div key={i}>
          {page.items.map((repo: any) => {
            <Link href={`/repos/${repo.owner.login}/${repo.name}`}>
              <RepoCard repo={repo} />
            </Link>;
          })}
        </div>;
      })}
    </>
  );
}
