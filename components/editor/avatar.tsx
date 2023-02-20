import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Avatar = ({
  clr,
  src,
  name,
}: {
  clr: "blue" | "green" | "red" | "yellow" | "orange" | "purple" | "zinc"
  src: string | null | undefined
  name: string
}) => {
  const ring = {
    zinc: "ring-zinc-500",
    blue: "ring-blue-500",
    green: "ring-green-500",
    red: "ring-red-500",
    yellow: "ring-yellow-500",
    orange: "ring-orange-500",
    purple: "ring-purple-500",
    pink: "ring-pink-500",
  }
  const avatarCn = cn(
    "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2",
    ring[clr]
  )
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className="rounded-full">
          <div className={avatarCn}>
            <Image
              className="min-h-full min-w-full object-cover"
              src={src ?? ""}
              alt={name + "'s avatar"}
              fill
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="select-none">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Avatar
