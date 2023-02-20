import { createClient } from "@liveblocks/client"
import { create } from "zustand"
import { liveblocks } from "@liveblocks/zustand"
import type { WithLiveblocks } from "@liveblocks/zustand"

type Cursor = { x: number; y: number }

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
})

type T = {
  playlists: any
  setPlaylists: (playlist: any) => void
  selected: string
  setSelected: (selected: string) => void
  cursor: Cursor
  setCursor: (cursor: Cursor) => void
}

export const useStore = create<WithLiveblocks<T>>()(
  liveblocks(
    (set) => ({
      playlists: [],
      setPlaylists: (playlists: any) => set({ playlists }),
      selected: "",
      setSelected: (selected: string) => set({ selected }),
      cursor: { x: 0, y: 0 },
      setCursor: (cursor) => set({ cursor }),
    }),
    {
      client,
      presenceMapping: {
        cursor: true,
      },
    }
  )
)

export * from "./account"
