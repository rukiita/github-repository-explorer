import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repository } from "@/lib/githubSchemas";

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{repo.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {repo.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      <CardContent>{repo.language && <span>{repo.language}</span>}</CardContent>
      <CardFooter className="flex gap-4">
        <div>{repo.stargazers_count.toLocaleString()}</div>
        <div>{repo.forks_count.toLocaleString()}</div>
      </CardFooter>
    </Card>
  );
}
