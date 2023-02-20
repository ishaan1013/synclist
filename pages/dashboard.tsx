import Head from "next/head"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

import Sidebar from "@/components/dashboard/sidebar"
import { Editor, PlaylistSelect } from "@/components/dashboard/screens"
import { useEffect } from "react"
import { useAccountStore, usePlaylistStore } from "@/lib/state"

const Dashboard = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()
  const data = session?.user

  const setUserData = useAccountStore((state) => state.setUserData)
  const setAccessToken = useAccountStore((state) => state.setAccessToken)
  const selected = usePlaylistStore((state) => state.selected)

  useEffect(() => {
    setUserData(data)
    setAccessToken(user.accounts?.[0].access_token)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="dashboard-scroll flex h-full overflow-x-auto">
        <Sidebar />
        {/* <div className="w-96 text-xs text-zinc-500">
          {JSON.stringify(data)}
        </div> */}
        {selected ? <Editor /> : <PlaylistSelect />}
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

  console.log(user)

  return {
    props: {
      session,
      user,
    },
  }
}

export default Dashboard
