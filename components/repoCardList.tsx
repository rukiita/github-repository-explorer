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
  const { data } = useRepoSearch(query, sortBy, language);
  return (
    <>
      {repos.map((repo) => {
        <Link href="/repo/${repo.owner}/${repo.repo}">
          <RepoCard repo={repo} />
        </Link>;
      })}
    </>
  );
}
