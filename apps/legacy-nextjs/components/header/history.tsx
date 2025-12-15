"use client";

import { useEffect, useState } from "react";
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
import { History as HistoryIcon } from "lucide-react";
import { useRecentRepos } from "@/store/recentRepos";

export function History() {
  const { recentRepos, clearHistory } = useRecentRepos();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <HistoryIcon className="h-5 w-5 opacity-50" />
      </Button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="View History">
          <HistoryIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] flex flex-col"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Recent View</SheetTitle>
            {recentRepos.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-destructive mr-8"
              >
                Clear All
              </Button>
            )}
          </div>
          <SheetDescription>
            Repositories you recently visited (Max 5).
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1  px-6 mt-4 ">
          <div className="flex flex-col gap-2">
            {recentRepos.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-10">
                No history yet.
              </div>
            ) : (
              recentRepos.map((repo) => (
                <Link
                  key={repo.id}
                  href={`/repos/${repo.owner.login}/${repo.name}`}
                  className="block"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-3 px-2 font-normal"
                  >
                    <div className="flex items-center gap-3 w-full overflow-hidden">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={repo.owner.avatar_url} />
                        <AvatarFallback>{repo.owner.login[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-sm truncate">
                        <span className="font-medium truncate w-full text-left">
                          {repo.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {repo.owner.login}
                        </span>
                      </div>
                    </div>
                  </Button>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
