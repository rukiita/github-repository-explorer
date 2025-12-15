import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Repository } from "@/lib/types/githubSchemas";
import { LRUCache } from "@/lib/lru";

const MAX_CAPACITY = 5;

interface RecentReposState {
  recentRepos: Repository[];
  addRepo: (repo: Repository) => void;
  clearHistory: () => void;
}

export const useRecentRepos = create<RecentReposState>()(
  persist(
    (set) => ({
      recentRepos: [],
      addRepo: (repo) =>
        set((state) => {
          const lru = new LRUCache(
            MAX_CAPACITY,
            [...state.recentRepos].reverse()
          );
          lru.add(repo);

          return { recentRepos: lru.getValues() };
        }),
      clearHistory: () => set({ recentRepos: [] }),
    }),
    {
      name: "github-explorer-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
