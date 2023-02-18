import { Button } from "@/components/ui/button"
import { useAccountStore, usePlaylistStore } from "@/lib/state"
import { LucideLogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Sidebar = () => {
  const data = useAccountStore((state) => state.userData)
  const selected = usePlaylistStore((state) => state.selected)
  const setSelected = usePlaylistStore((state) => state.setSelected)
  const playlists = usePlaylistStore((state) => state.playlists)

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    if (playlists.playlists && selected) {
      const p = playlists.playlists?.items.find(
        (item: any) => item.id === selected
      )
      setName(p.name)
      setImage(p.images[0].url)
    }
  }, [selected])

  return (
    <div className="flex w-60 flex-col items-center justify-between bg-slate-900 py-10 px-1 xs:px-3">
      <Button
        onClick={() => setSelected("")}
        className="group relative m-0 flex h-16 w-full items-center justify-start space-x-3 rounded-lg bg-transparent p-2 text-left hover:bg-slate-800">
        <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-md bg-slate-600 bg-cover duration-200">
          {image ? (
            <Image
              className="min-h-full min-w-full object-cover"
              src={image}
              alt=""
              fill
            />
          ) : null}
        </div>
        <div className="-space-y-1">
          <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-white">
            {selected ? name : "No Playlist Selected"}
          </div>
          <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-slate-500">
            {selected ? "Change Playlist" : "(Select or create)"}
          </div>
        </div>
      </Button>
      <Button
        onClick={() => signOut()}
        className="group relative m-0 flex h-16 w-full items-center justify-start space-x-3 rounded-lg bg-transparent p-2 text-left hover:bg-slate-800">
        {/* <div className="group-hover:opcity-100 absolute left-5 z-10 -translate-y-2 opacity-0 duration-200 group-hover:translate-y-0">
          <LucideLogOut className="h-7 w-7 text-white" />
        </div> */}
        <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-md bg-slate-600 bg-cover duration-200">
          <Image
            className="min-h-full min-w-full object-cover"
            src={data?.image ?? ""}
            alt=""
            fill
          />
        </div>
        <div className="-space-y-1">
          <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-white">
            {data?.name}
          </div>
          <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-slate-500">
            {data?.email}
          </div>
        </div>
      </Button>
    </div>
  )
}

export default Sidebar
