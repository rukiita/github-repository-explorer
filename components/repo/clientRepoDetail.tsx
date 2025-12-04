"use client";
import { Repository } from "@/lib/githubSchemas";
import { useQuery } from "@tanstack/react-query";
import RepoHero from "./repoHero";
import RepoActions from "./repoActions";
import ReadmeViewer from "./readmeViewer";

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
  const { data: repository } = useQuery({
    queryKey: ["repository", owner, repoName],
    queryFn: () => Promise.resolve(null),
    enabled: !!repoInitialData,
    initialData: repoInitialData,
    staleTime: Infinity,
  });

  const { data: readme } = useQuery({
    queryKey: ["readme", owner, repoName],
    queryFn: () => Promise.resolve(null),
    enabled: !!readmeInitialData,
    initialData: readmeInitialData,
    staleTime: Infinity,
  });

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
