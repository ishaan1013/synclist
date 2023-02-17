import Head from "next/head"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

import Sidebar from "@/components/dashboard/sidebar"
import PlaylistSelect from "@/components/dashboard/playlistSelect"

const Dashboard = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <PlaylistSelect accessToken={user.accounts?.[0].access_token} />
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
