"use client";
import React, { use, useEffect } from "react";
import RepoHero from "@/components/repoHero";
import RepoActions from "@/components/repoActions";
import ReadmeViewer from "@/components/readmeViewer";
import { useReadme, useRepository } from "@/hooks/useGithub";
import { useRecentRepos } from "@/store/recentRepos";

interface RepoDetailPageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { owner, repo } = use(params);
  console.log("RepoDetaiPage owner", owner);
  const {
    data: repository,
    isLoading: isRepoLoading,
    error,
  } = useRepository(owner, repo);
  const { data: readmeContent, isLoading: isReadmeLoading } = useReadme(
    owner,
    repo
  );

  const addRepo = useRecentRepos((state) => state.addRepo);

  useEffect(() => {
    if (repository) {
      addRepo(repository);
    }
  }, [repository, addRepo]);

  if (isRepoLoading) {
    return (
      <div className="container py-8 space-y-4">
        <div>Loading repository data...</div>
      </div>
    );
  }

  if (error || !repository) {
    return <div className="container py-8">Repository not found.</div>;
  }

  return (
    <>
      <div>
        <section>
          <RepoHero repository={repository} />
          <RepoActions repository={repository} />
        </section>
        <section>
          <ReadmeViewer content={readmeContent} isLoading={isReadmeLoading} />
        </section>
      </div>
    </>
  );
}
