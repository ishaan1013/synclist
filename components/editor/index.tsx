import { Button } from "@/components/ui/button"
import { useAccountStore, useStore } from "@/lib/state"
import { Music } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import List from "./list"
import Avatar from "./avatar"
import LinkPopover from "./linkPopover"

const Editor = ({
  setEditorScroll,
}: {
  setEditorScroll: (editorScroll: number) => void
}) => {
  const accessToken = useAccountStore((state) => state.accessToken)
  const selected = useStore((state) => state.selected)
  const data = useAccountStore((state) => state.userData)

  const [songs, setSongs] = useState<any>(null)

  const ref = useRef<HTMLDivElement>(null)

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

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY
    if (ref?.current) {
      console.log(
        `onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${ref.current.scrollTop}`
      )
      setEditorScroll(ref.current.scrollTop)
    }
  }, [setEditorScroll])

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="dashboard-scroll flex h-full min-w-[650px] flex-grow flex-col items-start justify-start overflow-y-auto p-12">
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
          <LinkPopover />
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

export default Editor
