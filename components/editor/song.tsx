import Image from "next/image"
import { ForwardedRef, forwardRef } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GripVertical, Mic2, MoreVertical, Music, Trash2 } from "lucide-react"
import { circular } from "@/pages/_app"

const Song = forwardRef(
  (
    {
      song,
      id,
      attributes,
      listeners,
    }: { song: any; id: string; attributes?: any; listeners?: any },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className="flex items-center  justify-between rounded-md bg-zinc-100 p-3 text-zinc-900 hover:bg-zinc-200">
        <div className="flex items-center">
          {attributes && listeners ? (
            <button
              {...attributes}
              {...listeners}
              className="rounded-md p-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400">
              <GripVertical className="h-4 w-4" />
            </button>
          ) : (
            <button className="rounded-md p-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400">
              <GripVertical className="h-4 w-4" />
            </button>
          )}
          <div className="relative z-0 ml-2 aspect-square h-12 overflow-hidden rounded-md bg-zinc-600 bg-cover duration-200">
            {song?.cover ? (
              <Image
                className="min-h-full min-w-full object-cover"
                src={song?.cover ?? ""}
                alt=""
                sizes="90px"
                fill
              />
            ) : null}
          </div>
          <div className="ml-3">
            <div className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium 2xl:w-96">
              {song?.name}
              {/* {id ?? "none"} */}
            </div>
            <div className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-500 2xl:w-96">
              {song?.artist}
            </div>
          </div>
        </div>
        <SongOptionsDropdown />
      </div>
    )
  }
)

export const SongOptionsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-400">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Music className="mr-2 h-4 w-4" />
            <span className={circular.variable}>
              <span className="circular font-normal">See Song</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mic2 className="mr-2 h-4 w-4" />
            <span className={circular.variable}>
              <span className="circular font-normal">See Artist</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="font-medium text-red-500">
            <Trash2 className="mr-2 h-4 w-4" />
            <span className={circular.variable}>
              <span className="circular pr-1 font-normal">
                Remove From Playlist
              </span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Song.displayName = "Song"
export default Song
