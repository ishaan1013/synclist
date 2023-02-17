import { create } from 'zustand'

interface UDataType {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
}

interface T {
  playlists: any, 
  setPlaylists: (playlist: any) => void, 
  selected: string, 
  setSelected: (selected: string) => void}

export const usePlaylistStore = 
create<T>((set) => ({
  playlists: [],
  setPlaylists: (playlists: any) => set({ playlists }),
  selected: '',
  setSelected: (selected: string) => set({ selected }),
  
}))