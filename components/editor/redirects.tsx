import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export const NoAuth = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className="mb-8 text-4xl">Log in to start editing playlists!</div>
      <Button size="lg" variant={"default"}>
        <Link href="/" tabIndex={-1} className="flex items-center">
          Take Me There <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export const NoRoom = ({ expired }: { expired: boolean }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div className="mb-8 text-4xl">
        {expired
          ? `This editing room expired. Create a new one to keep going!`
          : "This editing room doesn&apos;t exist!"}
      </div>
      <Button size="lg" variant={"default"}>
        <Link href="/dashboard" tabIndex={-1} className="flex items-center">
          Select A Playlist To Edit <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
