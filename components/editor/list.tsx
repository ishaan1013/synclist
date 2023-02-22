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

const List = ({
  songs,
  setSongs,
}: {
  songs: any
  setSongs: Dispatch<React.SetStateAction<any>>
}) => {
  const [active, setActive] = useState<any>(null)
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
      console.log("changing order at list.tsx line 41")
      setSongs((items: any) => {
        const oldIndex = items.indexOf(
          items?.find((item: any) => item?.id === active?.id)
        )
        const newIndex = items.indexOf(
          items?.find((item: any) => item?.id === over?.id)
        )

        if (newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex)
        } else {
          return items
        }
      })
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
              {songs ? (
                songs.map((song: songType) => (
                  <SortableSong key={song.id} id={song.id} song={song} />
                ))
              ) : (
                <div>loading</div>
              )}
            </SortableContext>
          ) : null}
        </div>
        <DragOverlay>
          {activeId ? <Song id={activeId} song={active} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}

export default List
