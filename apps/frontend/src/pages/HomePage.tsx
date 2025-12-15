import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useRepoSearch } from "../hooks/useGithub";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(query);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRepoSearch(query, "best-match", "", 30);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue });
    }
  };

  const repos = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search repositories..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {isLoading && <div className="text-center py-8">Loading...</div>}
      {error && (
        <div className="text-red-500 text-center">Error: {error.message}</div>
      )}

      <div className="grid gap-4">
        {repos.map((repo: any) => (
          <div
            key={repo.id}
            className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
          >
            <Link
              to={`/repos/${repo.owner.login}/${repo.name}`}
              className="block"
            >
              <h3 className="text-xl font-bold text-blue-600 hover:underline">
                {repo.full_name}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {repo.description}
              </p>
              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🔀 {repo.forks_count}</span>
                <span>{repo.language}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
