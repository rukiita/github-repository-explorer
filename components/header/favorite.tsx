"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ExternalLink } from "lucide-react";
import { useFavorites } from "@/store/favorites"; // お気に入りストア
import { Badge } from "@/components/ui/badge";

export default function Favorite() {
  // 1. ストアからデータと削除用関数を取得
  const { favorites, toggleFavorite } = useFavorites();

  // 2. Hydration Error対策
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Heart className="h-5 w-5 opacity-50" />
      </Button>
    );
  }

  return (
    <Sheet>
      {/*trigger button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Favorites"
        >
          <Heart className="h-5 w-5" />
          {favorites.length > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            Favorites
            <Badge variant="secondary" className="ml-auto mr-8">
              {favorites.length}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Your saved repositories collection.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6 mt-4">
          <div className="flex flex-col gap-3">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2 mx-2">
                <Heart className="h-10 w-10 opacity-20" />
                <p className="text-sm">No favorites yet.</p>
              </div>
            ) : (
              favorites.map((repo) => (
                <div
                  key={repo.id}
                  className="group relative flex flex-col gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors mx-2"
                >
                  <Link
                    href={`/repos/${repo.owner.login}/${repo.name}`}
                    className="flex items-start gap-3"
                  >
                    <Avatar className="h-10 w-10 border mt-1">
                      <AvatarImage src={repo.owner.avatar_url} />
                      <AvatarFallback>{repo.owner.login[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm truncate pr-6">
                          {repo.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {repo.owner.login}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 px-1.5"
                        >
                          ⭐ {repo.stargazers_count.toLocaleString()}
                        </Badge>
                        {repo.language && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] h-5 px-1.5"
                          >
                            {repo.language}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(repo);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
