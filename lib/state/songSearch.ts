import { create } from "zustand"

interface T {
  search: string
  setSearch: (search: string) => void
}

export const useSongSearchStore = create<T>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}))
