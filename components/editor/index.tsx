import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/state"
import { Command, Music } from "lucide-react"
import { Dispatch, useCallback, useEffect, useRef, useState } from "react"
import List from "./list"
import Avatar from "./avatar"
import LinkPopover from "./linkPopover"
import songType from "@/lib/songType"

const Editor = ({
  setEditorScroll,
  setOpen,
}: {
  setEditorScroll: (editorScroll: number) => void
  setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  const accessToken = useStore((state) => state.accessToken)
  const selected = useStore((state) => state.selected)
  // const setSelected = useStore((state) => state.setSelected)
  const data = useStore((state) => state.userData)
  const others = useStore((state) => state.liveblocks.others)

  const songs = useStore((state) => state.songs)
  const setSongs = useStore((state) => state.setSongs)

  const messageMode = useStore((state) => state.messageMode)
  const setMessageMode = useStore((state) => state.setMessageMode)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected) {
      const getPlaylistSongs = async () => {
        const res = await fetch(
          `/api/spotify/getPlaylistSongs?accessToken=${accessToken}&id=${selected}`
        )
        return await res.json()
      }

      getPlaylistSongs().then((res) => {
        if (res?.songs?.items) {
          const songs: songType[] = res?.songs?.items.map((song: any) => {
            return {
              id: song?.track?.id,
              title: song?.track?.name,
              artist: song?.track?.artists[0].name,
              cover: song?.track?.album.images[0].url,
              songExt: song?.track?.external_urls.spotify,
              artistExt: song?.track?.artists[0].external_urls.spotify,
            }
          })
          setSongs(songs)
        }
      })
    }
  }, [selected, accessToken])

  const onScroll = useCallback(() => {
    if (ref?.current) {
      setEditorScroll(ref.current.scrollTop)
    }
  }, [setEditorScroll])

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="dashboard-scroll flex h-full min-w-[700px] flex-grow flex-col items-start justify-start overflow-y-auto p-12">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="text-2xl font-medium lg:text-3xl">
            Playlist Editor
          </div>
          <Button
            onClick={() => {
              setOpen(true)
            }}
            className="text-base">
            Add Song
            <div className="ml-1.5 flex items-center rounded-md border border-b-[3px] border-zinc-600 py-0.5 px-1 text-zinc-500">
              <Command className="h-3 w-3" />
              <span className="translate-y-[1px] text-xs">K</span>
            </div>
          </Button>
          <Button
            onClick={() => {
              setMessageMode(!messageMode)
            }}
            variant="subtle"
            className="text-base">
            Chat
            <div className="ml-1.5 flex items-center rounded-md border border-b-[3px] border-zinc-300 py-0.5 px-1 text-zinc-500">
              {messageMode ? (
                <span className="translate-y-[1px] text-xs tracking-tighter">
                  ESC
                </span>
              ) : (
                <span className="translate-y-[1px] text-xs">/</span>
              )}
            </div>
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Avatar name="Ishaan" src={data?.image} clr="zinc" />
            {others.map((presence) => (
              <Avatar
                // @ts-ignore
                name={presence?.presence?.userData?.name}
                // @ts-ignore
                src={presence?.presence?.userData?.image}
                clr="zinc"
              />
            ))}
          </div>
          <LinkPopover />
        </div>
      </div>
      {/* <div className="my-4 w-[900px] text-xs">{selected}</div> */}
      {/* <div className="mt-8 min-h-[400px] w-[900px] overflow-auto whitespace-pre text-xs">
        {JSON.stringify(songs, null, "\t")}
      </div> */}

      <List songs={songs} setSongs={setSongs} />
    </div>
  )
}

export default Editor
