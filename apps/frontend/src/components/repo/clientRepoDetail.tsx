"use client";
import { type Repository } from "@/lib/types/githubSchemas";
import RepoHero from "./repoHero";
import RepoActions from "./repoActions";
import ReadmeViewer from "./readmeViewer";
import { useReadme, useRepository } from "@/hooks/useGithub";
import type { RepoDetailLoaderData } from "@/lib/loaders";

interface ClientRepoDetailProps {
  data: RepoDetailLoaderData;
}

export default function ClientRepoDetail({ data }: ClientRepoDetailProps) {
  const { data: repository } = useRepository(
    data.owner,
    data.repo,
    data.repository
  );

  const { data: readme } = useReadme(data.owner, data.repo, data.readme);

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
