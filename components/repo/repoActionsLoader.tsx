import RepoActions from "./repoActions";
import { getGithubRepository } from "@/lib/repositories/github";

interface RepoActionLoaderProps {
  owner: string;
  repo: string;
}

export default async function RepoActionsLoader({
  owner,
  repo,
}: RepoActionLoaderProps) {
  const repository = await getGithubRepository().fetchRepoDetail(owner, repo);

  if (!repository) return <div>Repository not found.</div>;

  return <RepoActions repository={repository} />;
}
