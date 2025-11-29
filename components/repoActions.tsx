"use client";

import { Button } from "@/components/ui/button";
import { Heart, ExternalLink } from "lucide-react";
import type { Repository } from "@/lib/githubSchemas";
import { useFavorites } from "@/store/favorites";

interface RepoActionsProps {
  repository: Repository;
}

export default function RepoActions({ repository }: RepoActionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(repository.id);

  return (
    <div className="flex flex-col sm:flex-row gap-3 my-4">
      <Button asChild size="lg" className="flex-1 sm:flex-none gap-2 shadow-sm">
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
          <ExternalLink className="h-3 w-3 opacity-50 ml-1" />
        </a>
      </Button>

      <Button
        size="lg"
        variant={isFav ? "secondary" : "outline"}
        className={`flex-1 sm:flex-none gap-2 transition-all ${
          isFav ? "text-red-600 bg-red-50 hover:bg-red-100 border-red-200" : ""
        }`}
        onClick={() => toggleFavorite(repository)}
      >
        <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
        {isFav ? "Favorited" : "Add to Favorites"}
      </Button>
    </div>
  );
}
