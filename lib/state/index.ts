import { createClient } from "@liveblocks/client"
import { create } from "zustand"
import { liveblocks } from "@liveblocks/zustand"
import type { WithLiveblocks } from "@liveblocks/zustand"
import songType from "../songType"

export type UDataType = {
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
  userExt: string
  id: string
}

type Cursor = { x: number; y: number }

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
})

type T = {
  playlists: any
  setPlaylists: (playlists: any) => void
  songs: songType[]
  setSongs: (songs: songType[]) => void
  selected: string
  setSelected: (selected: string) => void
  roomId: string
  setRoomId: (roomId: string) => void
  cursor: Cursor
  setCursor: (cursor: Cursor) => void
  message: string
  setMessage: (message: string) => void
  messageMode: boolean
  setMessageMode: (messageMode: boolean) => void
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  userData: UDataType | undefined
  setUserData: (userData: UDataType | undefined) => void
  accessToken: string
  setAccessToken: (accessToken: string) => void
}

export const useStore = create<WithLiveblocks<T>>()(
  liveblocks(
    (set) => ({
      playlists: [],
      setPlaylists: (playlists) => set({ playlists }),
      songs: [],
      setSongs: (songs) => set({ songs }),
      selected: "",
      setSelected: (selected) => set({ selected }),
      roomId: "",
      setRoomId: (roomId) => set({ roomId }),
      cursor: { x: 0, y: 0 },
      setCursor: (cursor) => set({ cursor }),
      message: "",
      setMessage: (message) => set({ message }),
      messageMode: false,
      setMessageMode: (messageMode) => set({ messageMode }),
      expanded: true,
      setExpanded: (expanded) => set({ expanded }),
      userData: {
        name: "",
        email: "",
        image: "",
        userExt: "",
        id: "",
      },
      setUserData: (userData: UDataType | undefined) => set({ userData }),
      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      client,
      presenceMapping: {
        cursor: true,
        message: true,
        userData: true,
      },
      storageMapping: {
        songs: true,
        selected: true,
      },
    }
  )
)

export * from "./songSearch"
