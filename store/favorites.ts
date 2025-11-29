import Favorite from "@/components/favorite";
import { Repository } from "@/lib/githubSchemas";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favorites: Repository[];
  toggleFavorite: (repo: Repository) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (repo) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === repo.id);

        if (exists) {
          // delete
          set({ favorites: favorites.filter((f) => f.id !== repo.id) });
        } else {
          // add
          set({ favorites: [...favorites, repo] });
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },
    }),
    {
      name: "github-explorer-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
