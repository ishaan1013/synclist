import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "../ui/button"
import { ArrowRight, Github, Play, Square, Twitter } from "lucide-react"
import { signIn } from "next-auth/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

const Landing = () => {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

  return (
    <>
      <LoginDialog open={open} setOpen={setOpen} />
      <div className="my-24 flex w-full max-w-screen-lg flex-col items-center">
        <div className="relative">
          <DisplayCursor
            pos="md:top-5 top-3 md:left-36 sm:left-32 left-28"
            color="#2447e3"
            message="Hey 👋"
          />
          <DisplayCursor
            pos="md:top-10 top-8 md:right-48 sm:right-44 right-40"
            color="#ef4444"
            message="Hello 🙋‍♂️"
          />

          <div className="text-center text-5xl">
            Real-Time Spotify Playlist Collaboration
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
          <Button
            size="lg"
            variant={"default"}
            // onClick={() => signIn("spotify")}
            onClick={() => setOpen(true)}>
            Log In With Spotify <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" className="px-4" variant={"outline"}>
            <Github className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative mt-12 aspect-square w-full max-w-screen-lg overflow-hidden rounded-2xl bg-zinc-900 shadow-xl xs:aspect-video">
          <Button
            onClick={() => setPlaying((prev) => !prev)}
            variant="subtle"
            className="jusitfy-center absolute top-2 right-2 z-10 flex h-8 w-8 items-center rounded-full p-0 mix-blend-difference">
            {playing ? (
              <Square className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 pl-0.5" />
            )}
          </Button>
          <ReactPlayer
            className="min-h-full min-w-full object-cover"
            url="SyncList-Video.mp4"
            controls={false}
            loop
            playing={playing}
          />
        </div>
      </div>
    </>
  )
}

const LoginDialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Want to try SyncList?</DialogTitle>
          <DialogDescription>
            Spotify doesn&apos;t allow public OAuth access, so the developer
            needs to manually give users access. DM me on Twitter/Linkedin so I
            can give you access 😁
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid w-full grid-cols-2 gap-x-2">
          <Button variant="outline">
            <a
              className="flex items-center"
              tabIndex={-1}
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/ishaandey_">
              <Twitter className="mr-2 h-4 w-4" />
              @ishaandey_
            </a>
          </Button>
          <Button type="submit" onClick={() => signIn("spotify")}>
            Log In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const DisplayCursor = ({
  color,
  message,
  pos,
}: {
  color: string
  message: string
  pos: string
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-[1000] animate-bounce hidden md:block",
        pos
      )}>
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <div
        className="absolute top-5 left-2 rounded-lg p-0.5"
        onKeyUp={(e) => e.stopPropagation()}
        style={{ backgroundColor: color }}>
        <p className="max-w-[14.5rem] overflow-hidden text-ellipsis whitespace-nowrap px-1 text-sm leading-relaxed text-white">
          {message}
        </p>
      </div>
    </div>
  )
}

export default Landing
