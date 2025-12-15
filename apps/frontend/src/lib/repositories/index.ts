import { type IGithubRepository } from "./interface";
import { prodGithubRepository } from "./prod";
import { mockGithubRepository } from "./mock";

export const getGithubRepository = (): IGithubRepository => {
  const isE2E = process.env.NEXT_PUBLIC_IS_E2E === "true";
  return isE2E ? mockGithubRepository : prodGithubRepository;
};
