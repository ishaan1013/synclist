import { Button } from "@/components/ui/button"
import { useAccountStore, useStore } from "@/lib/state"
import { Check, Copy, Loader, Loader2, LucideLogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Sidebar = ({ editing }: { editing: boolean }) => {
  const data = useAccountStore((state) => state.userData)
  const selected = useStore((state) => state.selected)
  const setSelected = useStore((state) => state.setSelected)
  const playlists = useStore((state) => state.playlists)

  const others = useStore((state) => state.liveblocks.others)

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

  const [copiedId, setCopiedId] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  useEffect(() => {
    if (copiedId) {
      setTimeout(() => {
        setCopiedId(false)
      }, 1000)
    }
  }, [copiedId])

  useEffect(() => {
    if (copiedUrl) {
      setTimeout(() => {
        setCopiedUrl(false)
      }, 1000)
    }
  }, [copiedUrl])

  return (
    <div className="flex w-60 min-w-[15rem] flex-col items-center justify-between bg-zinc-900 py-10 px-3">
      <div className="flex w-full flex-col">
        <Link href="/dashboard">
          <Button
            onClick={() => setSelected("")}
            disabled={Boolean(selected) && !editing}
            className="group relative m-0 flex h-16 w-full items-center justify-start space-x-3 rounded-lg bg-transparent p-2 text-left hover:bg-zinc-800">
            <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-md bg-zinc-600 bg-cover duration-200">
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
              <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-zinc-500">
                {selected ? "Change Playlist" : "(Select or create)"}
              </div>
            </div>
          </Button>
        </Link>

        {selected ? (
          editing ? (
            <>
              <div className="mt-2 h-0.5 w-full bg-zinc-800" />
              <div className="mt-4 flex w-full justify-between space-x-2">
                <Button
                  onClick={() => setCopiedId(true)}
                  className="h-auto bg-zinc-800 py-1.5 px-3 text-sm hover:bg-zinc-700">
                  {copiedId ? (
                    <Check className="mr-1.5 h-3 w-3" />
                  ) : (
                    <Copy className="mr-1.5 h-3 w-3" />
                  )}
                  Room ID
                </Button>
                <Button
                  onClick={() => setCopiedUrl(true)}
                  className="h-auto bg-zinc-800 py-1.5 px-3 text-sm hover:bg-zinc-700">
                  {copiedUrl ? (
                    <Check className="mr-1.5 h-3 w-3" />
                  ) : (
                    <Copy className="mr-1.5 h-3 w-3" />
                  )}
                  Invite URL
                </Button>
              </div>
              <div className="mt-3 flex items-center space-x-2 pl-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
                <div className="text-sm text-white">
                  {others.length + 1} Collaborator{others.length > 0 ? "s" : ""}{" "}
                  Active
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-2 h-0.5 w-full bg-zinc-800" />
              <Loader2 className="mt-6 h-8 w-8 animate-spin animate-pulse self-center text-zinc-500" />
            </>
          )
        ) : null}
      </div>
      <Button
        onClick={() => signOut()}
        className="group relative m-0 flex h-16 w-full items-center justify-start space-x-3 rounded-lg bg-transparent p-2 text-left hover:bg-zinc-800">
        {/* <div className="group-hover:opcity-100 absolute left-5 z-10 -translate-y-2 opacity-0 duration-200 group-hover:translate-y-0">
          <LucideLogOut className="h-7 w-7 text-white" />
        </div> */}
        <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-md bg-zinc-600 bg-cover duration-200">
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
          <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-zinc-500">
            {data?.email}
          </div>
        </div>
      </Button>
    </div>
  )
}

export default Sidebar
