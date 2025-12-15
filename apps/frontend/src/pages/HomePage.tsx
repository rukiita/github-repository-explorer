import { Suspense } from "react";
import { useSearchParams } from "react-router-dom"; // 追加
import FilterBar from "../components/filterBar";
import RepoCardList from "../components/repo/repoCardList";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") || "best-match";
  const language = searchParams.get("lang") || "";

  return (
    <div className="mx-4">
      <Suspense fallback={<div>Loading search...</div>}>
        <FilterBar />
      </Suspense>
      <RepoCardList query={query} sortBy={sort} language={language} />
    </div>
  );
}
