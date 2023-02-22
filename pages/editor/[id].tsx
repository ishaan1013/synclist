import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { useEffect, useState } from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { prisma } from "@/lib/prisma"
import { useAccountStore, useStore } from "@/lib/state"

import Sidebar from "@/components/sidebar"
import Editor from "@/components/editor"
import Cursor from "@/components/editor/cursor"
import AddSongDialog from "@/components/editor/songSearchCommand"
import { useRouter } from "next/router"

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#ef4444",
  "#eab308",
  "#f97316",
  "#a855f7",
  "#ec4899",
]

const EditorScreen = ({
  user,
  playlist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const data = session?.user

  const setUserData = useAccountStore((state) => state.setUserData)
  const setAccessToken = useAccountStore((state) => state.setAccessToken)
  const setSelected = useStore((state) => state.setSelected)

  useEffect(() => {
    setUserData(data)
    setAccessToken(user.accounts?.[0].access_token)
    setSelected(playlist)
  }, [])

  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useStore()
  const others = useStore((state) => state.liveblocks.others)
  // const cursor = useStore((state) => state.cursor)
  const setCursor = useStore((state) => state.setCursor)
  // const othersCursors = others.map((user) => user.presence.cursor)

  const router = useRouter()
  const roomId = router.asPath.split("/")[2]

  useEffect(() => {
    enterRoom(roomId)
    return () => {
      leaveRoom(roomId)
    }
  }, [enterRoom, leaveRoom])

  const [editorScroll, setEditorScroll] = useState(0)
  const [songDialogOpen, setSongDialogOpen] = useState(false)

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
            color={COLORS[connectionId % COLORS.length]}
            // @ts-ignore
            x={presence?.cursor?.x}
            // @ts-ignore
            y={presence?.cursor?.y - editorScroll}
          />
        )
      })}

      <AddSongDialog open={songDialogOpen} setOpen={setSongDialogOpen} />

      <div className="dashboard-scroll flex h-full overflow-x-auto">
        <Sidebar editing selected={playlist} />
        <Editor setEditorScroll={setEditorScroll} setOpen={setSongDialogOpen} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? "",
    },
    include: {
      accounts: true,
    },
  })

  const room = await prisma.room.findUnique({
    where: {
      id: typeof context.params?.id === "string" ? context.params.id : "",
    },
  })
  console.log(
    "🚀 ~ file: [id].tsx:131 ~ constgetServerSideProps:GetServerSideProps= ~ room:",
    room
  )
  const playlist = room ? room.playlist : ""

  console.log(user)

  return {
    props: {
      session,
      user,
      playlist,
    },
  }
}

export default EditorScreen
