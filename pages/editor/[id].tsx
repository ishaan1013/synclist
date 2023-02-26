import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { useSession } from "next-auth/react"
import { prisma } from "@/lib/prisma"
import { UDataType, useStore } from "@/lib/state"
import COLORS from "@/lib/colors"

import Sidebar from "@/components/sidebar"
import Editor from "@/components/editor"
import Cursor from "@/components/editor/cursor"
import AddSongDialog from "@/components/editor/songSearchCommand"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getPlaylists } from "@/lib/client/getPlaylists"

const EditorScreen = ({
  user,
  playlist,
  expiry,
  owner,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const data = session?.user

  const accessToken = useStore((state) => state.accessToken)
  const setPlaylists = useStore((state) => state.setPlaylists)
  const setAccessToken = useStore((state) => state.setAccessToken)
  const setUserData = useStore((state) => state.setUserData)
  const setSelected = useStore((state) => state.setSelected)

  useEffect(() => {
    const userData: UDataType = {
      id: user.accounts?.[0].providerAccountId,
      userExt: user.accounts?.[0].providerAccountId,
      email: data?.email,
      name: data?.name,
      image: data?.image,
    }
    setUserData(userData)

    if (owner === user.accounts?.[0].providerAccountId) {
      setAccessToken(user.accounts?.[0].access_token)
    }
    setSelected(playlist)
  }, [])

  const {
    liveblocks: { enterRoom, leaveRoom },
  } = useStore()
  const others = useStore((state) => state.liveblocks.others)

  const cursor = useStore((state) => state.cursor)
  const message = useStore((state) => state.message)
  const messageMode = useStore((state) => state.messageMode)

  const setCursor = useStore((state) => state.setCursor)
  const setMessage = useStore((state) => state.setMessage)
  const setMessageMode = useStore((state) => state.setMessageMode)

  const expanded = useStore((state) => state.expanded)

  const [editorScroll, setEditorScroll] = useState(0)
  const [songDialogOpen, setSongDialogOpen] = useState(false)

  const router = useRouter()
  const roomId = router.asPath.split("/")[2]

  useEffect(() => {
    if (playlist && !expired) {
      enterRoom(roomId)
      return () => {
        leaveRoom(roomId)
      }
    }
  }, [enterRoom, leaveRoom])

  const expired = expiry < Date.now()

  useEffect(() => {
    if (accessToken) {
      getPlaylists({ accessToken }).then((res) => {
        setPlaylists(res.playlists)
      })
    }
  }, [accessToken])

  return (
    <div
      className="h-screen w-screen overflow-hidden"
      onPointerMove={(e) =>
        setCursor({
          x: e.clientX + (expanded ? 0 : 152),
          y: e.clientY + editorScroll,
        })
      }>
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {playlist && !expired ? (
        <>
          {session ? (
            <>
              {others.map(({ connectionId, presence }) => {
                if (presence.cursor === null || !presence.cursor) {
                  return null
                }
                return (
                  <Cursor
                    key={`cursor-${connectionId}`}
                    color={COLORS[connectionId % COLORS.length]}
                    // @ts-ignore
                    x={presence?.cursor?.x - (expanded ? 0 : 152)}
                    // @ts-ignore
                    y={presence?.cursor?.y - editorScroll}
                    // @ts-ignore
                    message={presence.message}
                    // @ts-ignore
                    messageMode={presence.messageMode}
                    self={false}
                  />
                )
              })}

              <Cursor
                key={`self`}
                color="#3b82f6"
                // @ts-ignore
                x={cursor?.x}
                // @ts-ignore
                y={cursor?.y - editorScroll}
                message={message}
                // message={"message"}
                self
                messageMode={messageMode}
                setMessageMode={setMessageMode}
                setMessage={setMessage}
              />
              <AddSongDialog
                open={songDialogOpen}
                setOpen={setSongDialogOpen}
              />
              <div className="dashboard-scroll flex h-full overflow-x-auto">
                <Sidebar editing selected={playlist} />
                {/* <div>{JSON.stringify(playlist)}</div> */}
                <Editor
                  setEditorScroll={setEditorScroll}
                  setOpen={setSongDialogOpen}
                />
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
              <div className="mb-8 text-4xl">
                Log in to start editing playlists!
              </div>
              <Button size="lg" variant={"default"}>
                <Link href="/" tabIndex={-1} className="flex items-center">
                  Take Me There <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </>
      ) : (
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
      )}
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
  const owner = room ? room.owner : ""
  const expiry = room ? room.createdAt.getTime() + 3600000 : undefined

  return {
    props: {
      session,
      user,
      playlist,
      expiry,
      owner,
    },
  }
}

export default EditorScreen
