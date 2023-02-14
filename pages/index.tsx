import Landing from "@/components/landing"
import Head from "next/head"

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center overflow-hidden px-3 xs:px-6 sm:px-12">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  )
}
