import { Button } from "@/components/ui/button"
import { useAccountStore, useStore } from "@/lib/state"
import { cn } from "@/lib/utils"
import { Check, ChevronLeft, Copy, Loader2, LucideLogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Sidebar = ({
  editing,
  selected,
}: {
  editing: boolean
  selected?: any
}) => {
  const data = useAccountStore((state) => state.userData)
  const setSelected = useStore((state) => state.setSelected)
  const playlists = useStore((state) => state.playlists)

  const others = useStore((state) => state.liveblocks.others)

  const expanded = useStore((state) => state.expanded)
  const setExpanded = useStore((state) => state.setExpanded)

  const [expandedUI, setExpandedUI] = useState(true)

  useEffect(() => {
    if (expanded) {
      setTimeout(() => {
        setExpandedUI(true)
      }, 100)
    } else {
      setExpandedUI(false)
    }
  }, [expanded])

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    if (selected && playlists?.items) {
      const p = playlists.items.find((item: any) => item.id === selected)
      setName(p?.name)
      setImage(p?.images[0].url)
    }
  }, [selected, playlists])

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

  const router = useRouter()
  const roomId = router.asPath.split("/")[2]

  return (
    <div
      className={cn(
        expanded ? "w-60 min-w-[15rem]" : "w-20 min-w-[5.5rem]",
        "relative flex flex-col items-center justify-between bg-zinc-900 py-10 px-3 duration-100"
      )}>
      <Button
        variant="subtle"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className={cn(
          expanded ? "rotate-0" : "rotate-180",
          "absolute right-0 top-1/2 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200 p-1 text-xs shadow-[0_0px_20px_2px] shadow-zinc-900/50 duration-100"
        )}>
        <ChevronLeft className="" />
      </Button>
      <div className="flex w-full flex-col">
        <Button
          onClick={() => setSelected("")}
          disabled={Boolean(selected) && !editing}
          className={cn(
            !expandedUI && "max-w-[4rem]",
            "relative m-0 h-16 w-full rounded-lg bg-transparent p-2 text-left hover:bg-zinc-800"
          )}>
          <Link
            href="/dashboard"
            tabIndex={-1}
            className="flex h-full w-full items-center justify-start">
            <div className="relative z-0 aspect-square h-12 overflow-hidden rounded-md bg-zinc-600 bg-cover duration-100">
              {image ? (
                <Image
                  className="min-h-full min-w-full object-cover"
                  src={image}
                  alt=""
                  fill
                />
              ) : null}
            </div>
            {expandedUI ? (
              <div className="ml-3 -space-y-1">
                <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-white">
                  {selected ? name : "No Playlist Selected"}
                </div>
                <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-zinc-500">
                  {selected ? "Change Playlist" : "(Select or create)"}
                </div>
              </div>
            ) : null}
          </Link>
        </Button>

        {selected ? (
          editing ? (
            <>
              {expandedUI ? (
                <>
                  <div className="mt-2 h-0.5 w-full bg-zinc-800" />

                  <div className="mt-4 flex w-full justify-between space-x-2">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(roomId)
                        setCopiedId(true)
                      }}
                      className="h-auto bg-zinc-800 py-1.5 px-3 text-sm hover:bg-zinc-700">
                      {copiedId ? (
                        <Check className="mr-1.5 h-3 w-3" />
                      ) : (
                        <Copy className="mr-1.5 h-3 w-3" />
                      )}
                      Room ID
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://synclist.ishaand.com/editor/${roomId}`
                        )
                        setCopiedUrl(true)
                      }}
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
                      {others.length + 1} Collaborator
                      {others.length > 0 ? "s" : ""} Active
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 flex items-center space-x-2 self-center">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
                  <div className="text-sm text-white">{others.length + 1}</div>
                </div>
              )}
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
        className={cn(
          !expandedUI && "max-w-[4rem]",
          "group relative m-0 flex h-16 w-full items-center justify-start rounded-lg bg-transparent p-2 text-left hover:bg-zinc-800"
        )}>
        <div className="relative z-0 flex aspect-square h-12 items-center justify-center overflow-hidden rounded-md bg-zinc-600 bg-cover duration-100">
          <div className="absolute z-10 opacity-0 duration-200 group-hover:opacity-100">
            <LucideLogOut className="h-7 w-7 text-white" />
          </div>
          {data?.image ? (
            <Image
              className="z-0 min-h-full min-w-full object-cover duration-200 group-hover:opacity-50 group-hover:brightness-50"
              src={data?.image ?? ""}
              alt=""
              sizes="128px"
              fill
            />
          ) : null}
        </div>
        {expandedUI ? (
          <div className="ml-3 -space-y-1">
            <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-white">
              {data?.name}
            </div>
            <div className="w-[8.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm font-normal text-zinc-500">
              {data?.email}
            </div>
          </div>
        ) : null}
      </Button>
    </div>
  )
}

export default Sidebar
