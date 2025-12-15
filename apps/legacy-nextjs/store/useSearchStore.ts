import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SearchState {
  lastQueryString: string;
  setLastQueryString: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      lastQueryString: "",
      setLastQueryString: (query) => set({ lastQueryString: query }),
    }),
    {
      name: "github-search-params", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
