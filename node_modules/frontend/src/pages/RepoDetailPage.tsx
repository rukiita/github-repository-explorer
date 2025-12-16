import { useParams } from "react-router-dom";
import ClientRepoDetail from "@/components/repo/clientRepoDetail";

export default function RepoDetailPage() {
  const { owner, repo } = useParams();

  if (!owner || !repo) return <div>Invalid URL</div>;

  return <ClientRepoDetail owner={owner} repo={repo} />;
}
