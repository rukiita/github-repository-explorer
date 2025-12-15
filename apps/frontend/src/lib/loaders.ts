import { type LoaderFunctionArgs } from "react-router-dom";
import { prodGithubRepository } from "./repositories/prod";

// loader of repositories list page
export const repoListLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // retrieve query parameters
  const query = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "best-match";
  const lang = searchParams.get("lang") ?? "all";
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  // call the production repository to fetch repositories
  return await prodGithubRepository.fetchRepos({
    query,
    sort,
    lang,
    page,
    perPage: 30,
  });
};

// 2. loader of repository detail page
export const repoDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  // retrieve path parameters
  const { owner, repo } = params;

  if (!owner || !repo) {
    throw new Error("Invalid parameters");
  }

  // call the production repository to fetch repository detail and readme
  const [repository, readme] = await Promise.all([
    prodGithubRepository.fetchRepoDetail(owner, repo),
    prodGithubRepository.fetchReadme(owner, repo),
  ]);

  return { repository, readme, owner, repo };
};

export type RepolistLoaderData = Awaited<ReturnType<typeof repoListLoader>>;
export type RepoDetailLoaderData = Awaited<ReturnType<typeof repoDetailLoader>>;
