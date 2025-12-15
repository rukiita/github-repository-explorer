import { Suspense } from "react";
import { useParams } from "react-router-dom"; // 追加
import RepoActionsLoader from "../components/repo/repoActionsLoader";
import ReadmeViewerLoader from "../components/repo/readmeViewerLoader";
import { Skeleton } from "../components/ui/skeleton";
import RepoHeroLoader from "../components/repo/repoHeroLoader";

export default function RepoDetailPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  if (!owner || !repo) return <div>Invalid URL</div>;

  return (
    <div className="mx-4">
      <Suspense fallback={<Skeleton className="h-40 w-full rounded-xl" />}>
        <RepoHeroLoader owner={owner} repo={repo} />
        <RepoActionsLoader owner={owner} repo={repo} />
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-64 w-full" />
          </div>
        }
      >
        <ReadmeViewerLoader owner={owner} repo={repo} />
      </Suspense>
    </div>
  );
}
