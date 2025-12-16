"use client";
import RepoHero from "./repoHero";
import RepoActions from "./repoActions";
import ReadmeViewer from "./readmeViewer";
import { useReadme, useRepository } from "@/hooks/useGithub";

interface ClientRepoDetailProps {
  owner: string;
  repo: string;
}

export default function ClientRepoDetail({
  owner,
  repo,
}: ClientRepoDetailProps) {
  const { data: repository, isLoading, isError } = useRepository(owner, repo);
  const { data: readme } = useReadme(owner, repo);

  // ローディングハンドリング（Loaderを使っているので基本一瞬ですが、安全策として）
  if (isLoading) return <div>Loading...</div>;
  if (isError || !repository) return <div>Repository not found</div>;

  return (
    <div className="mx-4">
      <RepoHero repository={repository} />
      <RepoActions repository={repository} />

      <div className="my-8" />

      {readme ? (
        <ReadmeViewer content={readme} />
      ) : (
        <div className="p-4 text-muted-foreground">No README found.</div>
      )}
    </div>
  );
}
