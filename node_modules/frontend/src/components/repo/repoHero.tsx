import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Eye, CircleDot } from "lucide-react";
import type { Repository } from "@/lib/types/githubSchemas";

interface RepoHeroProps {
  repository: Repository;
}

export default function RepoHero({ repository }: RepoHeroProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
          <AvatarImage
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <AvatarFallback>
            {repository.owner.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-3 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {repository.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {repository.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-2">
            {repository.language && (
              <Badge variant="secondary" className="px-3 py-1">
                {repository.language}
              </Badge>
            )}
            {repository.license && (
              <Badge variant="outline" className="px-3 py-1">
                {repository.license.name}
              </Badge>
            )}
            <Badge variant="outline" className="px-3 py-1">
              Updated {new Date(repository.updated_at).toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Star}
          label="Stars"
          value={repository.stargazers_count}
        />
        <StatCard icon={GitFork} label="Forks" value={repository.forks_count} />
        <StatCard
          icon={Eye}
          label="Watchers"
          value={repository.watchers_count}
        />
        <StatCard
          icon={CircleDot}
          label="Issues"
          value={repository.open_issues_count}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-xl bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-2xl font-bold font-mono">
        {new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}
      </span>
    </div>
  );
}
