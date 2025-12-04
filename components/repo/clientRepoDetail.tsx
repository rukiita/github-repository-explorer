"use client";
import { Repository } from "@/lib/githubSchemas";
import RepoHero from "./repoHero";
import RepoActions from "./repoActions";
import ReadmeViewer from "./readmeViewer";
import { useReadme, useRepository } from "@/hooks/useGithub";

interface ClientRepoDetailProps {
  repoInitialData: Repository | null;
  readmeInitialData: string | null;
  owner: string;
  repoName: string;
}

export default function ClientRepoDetail({
  repoInitialData,
  readmeInitialData,
  owner,
  repoName,
}: ClientRepoDetailProps) {
  const { data: repository } = useRepository(owner, repoName, repoInitialData);

  const { data: readme } = useReadme(owner, repoName, readmeInitialData);

  if (!repository) return <div>Repository not found</div>;

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
