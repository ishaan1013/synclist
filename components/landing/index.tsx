import { Button } from "../ui/button"
import { ArrowRight, Github } from "lucide-react"
import { signIn } from "next-auth/react"

const Landing = () => {
  return (
    <div className="my-24 flex w-full max-w-screen-lg flex-col items-center">
      <div className="text-center text-5xl">
        {/* Real-Time Spotify Playlist Collaboration */}
      </div>
      <div className="mt-8 flex space-x-4">
        <Button variant={"default"} onClick={() => signIn("spotify")}>
          Log In With Spotify <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant={"outline"}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
      <div className="mt-12 aspect-square w-full max-w-screen-lg rounded-3xl bg-slate-900 xs:aspect-video"></div>
    </div>
  )
}

export default Landing
