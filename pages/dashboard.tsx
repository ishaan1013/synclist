import Head from "next/head"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"

import Sidebar from "@/components/dashboard/sidebar"
import PlaylistSelect from "@/components/dashboard/playlistSelect"

const Dashboard = () => {
  const { data: session } = useSession()
  const data = session?.user

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full">
        <Sidebar data={data} />
        <PlaylistSelect />
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

  return {
    props: {
      session,
    },
  }
}

export default Dashboard
