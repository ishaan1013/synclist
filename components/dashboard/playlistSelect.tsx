import { Button } from "@/components/ui/button"
import { useAccountStore, useStore } from "@/lib/state"
import { FolderPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const PlaylistSelect = () => {
  const accessToken = useAccountStore((state) => state.accessToken)
  const playlists = useStore((state) => state.playlists)
  const setPlaylists = useStore((state) => state.setPlaylists)
  const setSelected = useStore((state) => state.setSelected)

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await fetch(
        "/api/spotify/getPlaylists?accessToken=" + accessToken
      )
      return await res.json()
    }
    console.log("use access token", accessToken)

    getPlaylists().then((res) => {
      setPlaylists(res)
    })
  }, [accessToken])

  return (
    <div className="flex h-full flex-grow flex-col items-start justify-start overflow-y-auto p-12">
      <div className="flex w-full items-center justify-between">
        <div className="text-3xl font-medium">Select A Playlist</div>
        <Button className="text-base">
          <FolderPlus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>
      {/* <div className="my-4 w-[900px] text-xs">{accessToken}</div> */}
      <div className=" mt-8 flex w-full max-w-screen-lg flex-wrap gap-4">
        {playlists.playlists ? (
          playlists.playlists?.items?.map((playlist: any, i: number) => (
            <Link href="/editor" key={i}>
              <Button
                className="h-auto w-52 flex-col items-start justify-start rounded-lg p-3 text-base"
                variant="subtle"
                onClick={() => setSelected(playlist.id)}>
                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    src={playlist.images[0].url}
                    alt="playlist image"
                    fill
                    className="min-h-full min-w-full object-cover"
                  />
                </div>
                <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left">
                  {playlist.name}
                </div>
                <div className="ellipsis mt-1 h-5 w-full overflow-hidden whitespace-nowrap text-left text-sm font-normal text-zinc-500">
                  {playlist.description ?? ""}
                </div>
              </Button>
            </Link>
          ))
        ) : (
          <div className="text-zinc-500">
            No Playlists Found. Create one to get started!
          </div>
        )}
      </div>
      {/* <div className="h-96 w-[900px] overflow-auto whitespace-pre text-xs">
        {JSON.stringify(playlists, null, "\t")}
      </div> */}
    </div>
  )
}
