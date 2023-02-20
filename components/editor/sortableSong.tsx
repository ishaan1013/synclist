import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Song from "./song"

const SortableSong = ({ song, id }: { song: any; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Song song={song} id={id} attributes={attributes} listeners={listeners} />
    </div>
  )
}

export default SortableSong
