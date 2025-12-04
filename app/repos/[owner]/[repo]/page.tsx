import { Suspense, use } from "react";
import RepoActionsLoader from "@/components/repo/repoActionsLoader";
import ReadmeViewerLoader from "@/components/repo/readmeViewerLoader";
import { Skeleton } from "@/components/ui/skeleton";
import RepoHeroLoader from "@/components/repo/repoHeroLoader";

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
    </>
  );
}
