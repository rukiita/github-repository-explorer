import ClientRepoDetail from "@/components/repo/clientRepoDetail";
import { useLoaderData } from "react-router-dom";
import type { RepoDetailLoaderData } from "@/lib/loaders";

export default function RepoDetailPage() {
  const data = useLoaderData() as RepoDetailLoaderData;

  return <ClientRepoDetail data={data} />;
}
