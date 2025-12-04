import { getGithubRepository } from "@/lib/repositories/github";
import ClientRepoDetail from "@/components/repo/clientRepoDetail";

interface RepoDetailPageProps {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default async function RepoDetailPage({ params }: RepoDetailPageProps) {
  const { owner, repo } = await params;

  const [repository, readme] = await Promise.all([
    getGithubRepository().fetchRepoDetail(owner, repo),
    getGithubRepository().fetchReadme(owner, repo),
  ]);

  return (
    <ClientRepoDetail
      owner={owner}
      repoName={repo}
      repoInitialData={repository}
      readmeInitialData={readme}
    />
  );
}
