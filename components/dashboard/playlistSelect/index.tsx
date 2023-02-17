import { Button } from "@/components/ui/button"
import { FolderPlus } from "lucide-react"
import Image from "next/image"

const PlaylistSelect = ({ accessToken }: { accessToken: string }) => {
  return (
    <div className="flex flex-grow flex-col items-start justify-start p-12">
      <div className="flex w-full items-center justify-between">
        <div className="text-3xl font-medium">Select A Playlist</div>
        <Button className="text-base">
          <FolderPlus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>
      <div>{accessToken}</div>
    </div>
  )
}

export default PlaylistSelect
