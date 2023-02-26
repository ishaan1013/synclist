import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"

const Avatar = ({
  clr,
  src,
  name,
}: {
  clr:
    | "zinc"
    | "#22c55e"
    | "#ef4444"
    | "#eab308"
    | "#f97316"
    | "#a855f7"
    | "#ec4899"
  src: string | null | undefined
  name: string
}) => {
  const avatarCn = {
    zinc: "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600  outline-none ring-2 ring-offset-2 ring-zinc-500",
    "#22c55e":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring[#22c55e]",
    "#ef4444":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring-[#ef4444]",
    "#eab308":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring-[#eab308]",
    "#f97316":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring-[#f97316]",
    "#a855f7":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring-[#a855f7]",
    "#ec4899":
      "relative h-10 w-10 overflow-hidden rounded-full bg-zinc-600 outline-none ring-2 ring-offset-2 ring-[#ec4899]",
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger className="rounded-full">
          <div className={avatarCn[clr]}>
            {src ? (
              <Image
                className="min-h-full min-w-full object-cover"
                src={src ?? ""}
                alt={name + "'s avatar"}
                sizes={"90px"}
                fill
              />
            ) : null}
          </div>
          {/* {parseInt(clr) % COLORS.length} */}
        </TooltipTrigger>
        <TooltipContent side="bottom">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Avatar
