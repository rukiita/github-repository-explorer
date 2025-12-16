import {
  type Repository,
  type SearchResponse,
} from "@/lib/types/githubSchemas";

export interface SearchParams {
  query: string;
  sort: string;
  lang: string;
  page: number;
  perPage?: number;
}

export interface IGithubRepository {
  fetchRepos(params: SearchParams): Promise<SearchResponse>;
  fetchRepoDetail(owner: string, repo: string): Promise<Repository | null>;
  fetchReadme(owner: string, repo: string): Promise<string | null>;
}
