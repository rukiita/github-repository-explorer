import FilterBar from "@/components/filterBar";
import RepoCardList from "@/components/repo/repoCardList";
import Image from "next/image";
import { Suspense, use } from "react";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    lang?: string;
  }>;
}

export default function Home({ searchParams }: HomeProps) {
  const params = use(searchParams);
  const query = params.q ?? "";
  const sort = params.sort || "best-match";
  const language = params.lang || "";

  return (
    <>
      <div className="mx-4">
        <Suspense fallback={<div>Loading search...</div>}>
          <FilterBar />
        </Suspense>
        <RepoCardList query={query} sortBy={sort} language={language} />
      </div>
    </>
  );
}
