import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Dispatch, useEffect, useState } from "react"

const AddSongDialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  useEffect(() => {
    const ctrlK = (e: KeyboardEvent) =>
      (e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")

    const handler = (e: KeyboardEvent) => {
      if (ctrlK(e)) {
        setOpen((open) => !open)
      }
    }

    const ignore = (e: KeyboardEvent) => {
      if (ctrlK(e)) e.preventDefault()
    }

    window.addEventListener("keyup", handler)
    window.addEventListener("keydown", ignore)
    return () => {
      window.addEventListener("keyup", handler)
      window.addEventListener("keydown", ignore)
    }
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Spotify for a song..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default AddSongDialog
