import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repository } from "@/lib/githubSchemas";
import { GitFork } from "lucide-react";

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="h-50">
      <CardHeader>
        <CardTitle>{repo.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {repo.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      <CardContent>Language：{repo.language && <span>{repo.language}</span>}</CardContent>
      <CardFooter className="flex gap-4">
        <div>⭐{repo.stargazers_count.toLocaleString()}</div>
        <div className="flex items-center">
          <GitFork />
          {repo.forks_count.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}
