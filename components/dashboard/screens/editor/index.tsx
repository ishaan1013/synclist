import { Button } from "@/components/ui/button"
import { useAccountStore, usePlaylistStore } from "@/lib/state"
import { Check, Copy, Music } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Users } from "lucide-react"
import List from "./list"
import Image from "next/image"
import Avatar from "./avatar"
import { circular } from "@/pages/_app"
import { cn } from "@/lib/utils"

export const Editor = () => {
  const accessToken = useAccountStore((state) => state.accessToken)
  const selected = usePlaylistStore((state) => state.selected)
  const data = useAccountStore((state) => state.userData)

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
    <div className="dashboard-scroll flex h-full min-w-[650px] flex-grow flex-col items-start justify-start overflow-y-auto p-12">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-medium">Playlist Editor</div>
          <Button className="text-base">
            <Music className="mr-2 h-4 w-4" />
            Add Song
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="translate-y-1">
            <Avatar name="Ishaan" src={data?.image} clr="zinc" />
          </div>
          <UserPopover />
        </div>
      </div>
      {/* <div className="my-4 w-[900px] text-xs">{accessToken}</div> */}
      {/* <div className="mt-8 min-h-[400px] w-[900px] overflow-auto whitespace-pre text-xs">
        {JSON.stringify(songs, null, "\t")}
      </div> */}
      <List songs={songs} />
    </div>
  )
}

export function UserPopover() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 w-10 rounded-full p-0">
          <Users className="h-4 w-4" />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={cn("w-80 p-2", circular.className)}>
        <div className="relative h-10 w-full overflow-hidden rounded-md border border-zinc-300 font-normal">
          <div className="absolute right-0 top-0 z-10 h-full w-32"></div>
          <Button
            onClick={() => setCopied(true)}
            className="circular absolute right-[3px] top-1/2 z-20 h-auto -translate-y-1/2 py-1.5 px-2 text-xs shadow-[0_0px_30px_30px] shadow-white">
            {copied ? (
              <Check className="mr-1 h-3 w-3" />
            ) : (
              <Copy className="mr-1 h-3 w-3" />
            )}
            Copy
          </Button>
          <div className="link-scroll circular flex h-10 w-80 overflow-x-auto overflow-y-hidden bg-transparent py-2 px-3 pr-24 text-sm font-normal">
            <div className="z-0">
              https://synclist.ishaand.com/editor/8916348713647
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
