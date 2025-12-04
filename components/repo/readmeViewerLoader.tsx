import { getGithubRepository } from "@/lib/repositories/github";
import ReadmeViewer from "./readmeViewer";

interface Props {
  owner: string;
  repo: string;
}

export default async function ReadmeViewerLoader({ owner, repo }: Props) {
  try {
    const content = await getGithubRepository().fetchReadme(owner, repo);
    if (!content) {
      return <div className="p-4 text-muted-foreground">No README found.</div>;
    }

    return <ReadmeViewer content={content} />;
  } catch (error) {
    console.error("[ReadmeViewerLoader] Error:", error);
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded border border-red-200">
        Failed to load README. Please try again later.
      </div>
    );
  }
}
