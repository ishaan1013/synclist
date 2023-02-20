import Head from "next/head"

import Sidebar from "@/components/sidebar"
import Editor from "@/components/editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { useStore } from "@/lib/state"
import Cursor from "@/components/editor/cursor"

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
]

const EditorScreen = () => {
  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useStore()
  const others = useStore((state) => state.liveblocks.others)
  const cursor = useStore((state) => state.cursor)
  const setCursor = useStore((state) => state.setCursor)
  const othersCursors = others.map((user) => user.presence.cursor)

  useEffect(() => {
    enterRoom("room-id")
    return () => {
      leaveRoom("room-id")
    }
  }, [enterRoom, leaveRoom])

  const [editorScroll, setEditorScroll] = useState(0)

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      onPointerMove={(e) =>
        setCursor({ x: e.clientX, y: e.clientY + editorScroll })
      }>
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null || !presence.cursor) {
          return null
        }

        return (
          <Cursor
            key={`cursor-${connectionId}`}
            // connectionId is an integer that is incremented at every new connections
            // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
            color={COLORS[connectionId % COLORS.length]}
            // @ts-ignore
            x={presence?.cursor?.x}
            // @ts-ignore
            y={presence?.cursor?.y}
          />
        )
      })}

      <div className="dashboard-scroll flex h-full overflow-x-auto">
        <Sidebar />
        {/* <div className="w-52">{JSON.stringify(editorScroll)}</div> */}
        <Editor setEditorScroll={setEditorScroll} />
      </div>
    </div>
  )
}

export default EditorScreen
