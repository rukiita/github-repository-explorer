import { getGithubRepository } from "@/lib/repositories";
import RepoHero from "./repoHero";

interface RepoHeroLoaderProps {
  owner: string;
  repo: string;
}

export default async function RepoHeroLoader({
  owner,
  repo,
}: RepoHeroLoaderProps) {
  const repository = await getGithubRepository().fetchRepoDetail(owner, repo);

  if (!repository) return <div>Repository not found.</div>;

  return <RepoHero repository={repository} />;
}
