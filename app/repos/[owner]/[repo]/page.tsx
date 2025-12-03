"use client";
import { use } from "react";
import { useReadme, useRepository } from "@/hooks/useGithub";
import RepoHeroLoader from "@/components/repo/RepoHeroLoader";
import RepoActionsLoader from "@/components/repo/RepoHeroLoader";
import ReadmeViewerLoader from "@/components/repo/readmeViewerLoader";

interface RepoDetailPageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { owner, repo } = use(params);

  return (
    <>
      <div className="mx-4">
        <section className="my-4">
          <RepoHeroLoader owner={owner} repo={repo} />
          <RepoActionsLoader owner={owner} repo={repo} />
        </section>
        <section>
          <ReadmeViewerLoader owner={owner} repo={repo} />
        </section>
      </div>
    </>
  );
}
