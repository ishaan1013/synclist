import Landing from "@/components/landing"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center overflow-hidden">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  )
}
