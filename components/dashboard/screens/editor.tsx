import { Button } from "@/components/ui/button"
import { useAccountStore, usePlaylistStore } from "@/lib/state"
import {
  Copy,
  Delete,
  Grip,
  GripVertical,
  Mic2,
  MoreVertical,
  Music,
  Trash2,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Editor = () => {
  const accessToken = useAccountStore((state) => state.accessToken)
  const playlists = usePlaylistStore((state) => state.playlists)
  const selected = usePlaylistStore((state) => state.selected)

  const [songs, setSongs] = useState<any>(null)

  useEffect(() => {
    if (selected) {
      const getPlaylistSongs = async () => {
        const res = await fetch(
          `/api/spotify/getPlaylistSongs?accessToken=${accessToken}&id=${selected}`
        )
        return await res.json()
      }
      console.log("use acccess token", accessToken)

      getPlaylistSongs().then((res) => {
        setSongs(res)
      })
    }
  }, [selected, accessToken])

  return (
    <div className="flex h-full flex-grow flex-col items-start justify-start overflow-y-auto p-12">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-medium">Playlist Editor</div>
          <Button className="text-base">
            <Music className="mr-2 h-4 w-4" />
            Add Song
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <UserPopover />
        </div>
      </div>
      {/* <div className="my-4 w-[900px] text-xs">{accessToken}</div> */}
      <div className="mt-8 flex w-full max-w-[28rem] flex-col space-y-2">
        {songs ? (
          songs.songs?.items?.map((song: any) => (
            <div className="flex items-center  justify-between rounded-md bg-zinc-100 p-3 text-zinc-900 hover:bg-zinc-200">
              <div className="flex items-center">
                <button className="rounded-md p-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2">
                  <GripVertical className="h-4 w-4" />
                </button>
                <div className="relative z-0 ml-2 aspect-square h-12 overflow-hidden rounded-md bg-zinc-600 bg-cover duration-200">
                  <Image
                    className="min-h-full min-w-full object-cover"
                    src={song?.track?.album?.images?.[0]?.url ?? ""}
                    alt=""
                    fill
                  />
                </div>
                <div className="ml-3">
                  <div className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
                    {song?.track?.name}
                  </div>
                  <div className="flex w-64 items-center space-x-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-500">
                    {song?.track?.artists?.map((artist: any, i: number) => (
                      <div key={artist.name + song.track.name}>
                        {artist.name +
                          (i < song?.track?.artists?.length - 1 ? "," : "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <SongOptionsDropdown />
            </div>
          ))
        ) : (
          <div>loading</div>
        )}
      </div>
      {/* <div className="mt-8 h-full w-[900px] overflow-auto whitespace-pre text-xs">
        {JSON.stringify(songs, null, "\t")}
      </div> */}
    </div>
  )
}

export function UserPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 w-10 rounded-full p-0">
          <Users className="h-4 w-4" />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-2">
        <div className="relative h-10 w-full overflow-hidden rounded-md border border-zinc-300 font-normal">
          <div className="absolute right-0 top-0 z-10 h-full w-32"></div>
          <Button className="absolute right-[3px] top-1/2 z-20 h-auto -translate-y-1/2 py-1.5 px-2 text-xs shadow-[0_0px_30px_30px] shadow-white">
            <Copy className="mr-1 h-3 w-3" />
            Copy
          </Button>
          <div className="link-scroll flex h-10 w-80 overflow-x-auto overflow-y-hidden bg-transparent py-2 px-3 pr-24 text-sm">
            <div className="z-0">
              https://synclist.ishaand.com/editor/8916348713647
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function SongOptionsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Music className="mr-2 h-4 w-4" />
            <span>See Song</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mic2 className="mr-2 h-4 w-4" />
            <span>See Artist</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete From Playlist</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
