import { Dispatch, useEffect, useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"

import Song from "./song"
import SortableSong from "./sortableSong"
import songType from "@/lib/songType"
import { Loader2 } from "lucide-react"

const List = ({
  songs,
  setSongs,
}: {
  songs: songType[]
  setSongs: (songs: songType[]) => void
}) => {
  const [active, setActive] = useState<songType>()
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active?.id !== over?.id) {
      const change = () => {
        const oldIndex = songs.indexOf(
          songs.find((item: songType) => item?.id === active?.id)!
        )
        const newIndex = songs.indexOf(
          songs.find((item: songType) => item?.id === over?.id)!
        )

        if (newIndex !== -1) {
          return arrayMove(songs, oldIndex, newIndex)
        } else {
          return songs
        }
      }
      setSongs(change())
    }

    setActiveId(null)
  }

  useEffect(() => {
    const a = songs?.find((item: any) => item?.id === activeId)
    setActive(a)
  }, [activeId])

  const handleDragStart = (event: any) => {
    const { active } = event

    setActiveId(active.id)
  }

  return (
    <>
      {/* <div className="whitespace-nowrap text-xs">
        {JSON.stringify(items) ?? "none"}
      </div> */}
      {/* <div className="font-bold text-red-500">{activeId ?? "no active"}</div> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <div className="mt-8 flex w-full max-w-screen-xs flex-col space-y-2 2xl:max-w-screen-sm">
          {songs ? (
            <SortableContext
              items={songs}
              strategy={verticalListSortingStrategy}>
              {songs && songs.length > 0 ? (
                songs?.map((song: songType, i: number) => (
                  <SortableSong key={i} id={song.id} song={song} />
                ))
              ) : (
                <div>
                  <Loader2 className="mt-4 h-8 w-8 animate-spin animate-pulse self-center text-zinc-500" />

                  <div className="mt-8 text-sm">Loading your playlist...</div>
                </div>
              )}
            </SortableContext>
          ) : null}
        </div>
        <DragOverlay>
          {activeId && active ? <Song id={activeId} song={active} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}

export default List
