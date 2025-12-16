import { QueryClient } from "@tanstack/react-query";
import { type LoaderFunctionArgs } from "react-router-dom";
import { repoQueries } from "./repositories/queries";

export const repoDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { owner, repo } = params;
    if (!owner || !repo) throw new Error("Invalid parameters");

    await Promise.all([
      queryClient.ensureQueryData(repoQueries.detail(owner, repo)),
      queryClient.ensureQueryData(repoQueries.readme(owner, repo)),
    ]);

    return null;
  };
