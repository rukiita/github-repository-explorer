import { getGithubRepository } from "@/lib/repositories/github";
import ReadmeViewer from "./readmeViewer";

interface Props {
  owner: string;
  repo: string;
}

export default async function ReadmeViewerLoader({ owner, repo }: Props) {
  const content = await getGithubRepository().fetchReadme(owner, repo);

  if (!content) {
    return <div className="p-4 text-muted-foreground">No README found.</div>;
  }

  return <ReadmeViewer content={content} />;
}
