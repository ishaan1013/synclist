import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { Dispatch, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAccountStore, useSongSearchStore } from "@/lib/state"
import Image from "next/image"

const SongSearchCommand = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  useEffect(() => {
    const ctrlK = (e: KeyboardEvent) =>
      (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")

    const handler = (e: KeyboardEvent) => {
      if (ctrlK(e)) {
        setOpen((open) => !open)
      }
    }

    const ignore = (e: KeyboardEvent) => {
      if (ctrlK(e)) e.preventDefault()
    }

    window.addEventListener("keyup", handler)
    window.addEventListener("keydown", ignore)
    return () => {
      window.addEventListener("keyup", handler)
      window.addEventListener("keydown", ignore)
    }
  }, [])

  const search = useSongSearchStore((state) => state.search)

  const [query, setQuery] = useState<string>("")
  const [songs, setSongs] = useState<any[]>([])
  const accessToken = useAccountStore((state) => state.accessToken)

  const searchSongs = async (q: string) => {
    console.log("accessToken", accessToken)
    console.log("q", q)
    const res = await fetch(
      `/api/spotify/searchSongs?q=${q}&accessToken=${accessToken}`
    )
    const json = await res.json()
    setSongs(json.songs?.tracks?.items)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(search)
      if (search) {
        searchSongs(search)
      }
    }, 600)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search on Spotify..." />
        <CommandList>
          {query ? (
            <div className="mt-4 w-80 overflow-hidden text-ellipsis whitespace-nowrap px-4 text-sm font-normal text-zinc-600">
              Searching for{" "}
              <span className="font-bold underline underline-offset-2">
                {query}
              </span>
            </div>
          ) : null}
          <div className="w-full p-4">
            {query ? (
              <>
                {songs &&
                  songs.map((song: any, i: number) => (
                    <Button
                      variant="ghost"
                      className="h-auto w-full justify-start p-2">
                      <div className="relative mr-2.5 aspect-square h-10 overflow-hidden rounded-md bg-zinc-600 bg-cover">
                        {song.album.images?.[0]?.url ? (
                          <Image
                            className="min-h-full min-w-full object-cover"
                            src={song.album.images?.[0]?.url ?? ""}
                            alt=""
                            fill
                          />
                        ) : null}
                      </div>
                      <div>
                        <div className="-mb-0.5 w-72 overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm">
                          {song.name ?? "No Song Name"}
                        </div>
                        <div className="flex w-72 items-center space-x-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-zinc-500">
                          {song.artists?.map((artist: any, i: number) => (
                            <div key={artist.name + song.name}>
                              {artist.name +
                                (i < song?.track?.artists?.length - 1
                                  ? ","
                                  : "")}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Button>
                  ))}
              </>
            ) : null}
          </div>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SongSearchCommand
