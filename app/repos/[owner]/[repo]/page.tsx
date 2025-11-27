"use client";
import React, { use } from "react";
import RepoHero from "@/components/repoHero";
import RepoActions from "@/components/repoActions";
import ReadmeViewer from "@/components/readmeViewer";
import { useReadme } from "@/hooks/useGithub";

interface RepoDetailPageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { owner, repo } = use(params);
  console.log("RepoDetaiPage owner", owner);
  const { data: readmeContent, isLoading: isReadmeLoading } = useReadme(
    owner,
    repo
  );
  return (
    <>
      <div>
        <section>
          <RepoHero />
          <RepoActions />
        </section>
        <section>
          <ReadmeViewer content={readmeContent} isLoading={isReadmeLoading} />
        </section>
      </div>
    </>
  );
}
