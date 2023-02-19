import Landing from "@/components/landing"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import Head from "next/head"
import { authOptions } from "./api/auth/[...nextauth]"

const Home = () => {
  //   { providers }: InferGetServerSidePropsType<typeof getServerSideProps>
  return (
    <div className="flex h-screen w-screen flex-col items-center overflow-hidden px-3 xs:px-6 sm:px-12">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="text-xs"> {JSON.stringify(providers)}</div> */}

      <Landing />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  // const providers = await getProviders()

  return {
    props: {
      session,
      // providers,
    },
  }
}

export default Home
