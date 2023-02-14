import Landing from "@/components/landing"
import Head from "next/head"

export default function Editor() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center overflow-hidden px-3 xs:px-6 sm:px-12">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-24 flex h-full">
        <div className="flex w-64 flex-col items-center space-y-3">
          <button className="flex w-full items-center space-x-3 rounded-xl bg-transparent p-2 hover:bg-slate-100">
            <div className="aspect-square h-12 rounded-lg bg-slate-300"></div>
            <div className="-space-y-1">
              <div className="text-medium text-left">Selecting Playist...</div>
              <div className="text-left text-sm text-slate-500">
                (Select or create)
              </div>
            </div>
          </button>
          <div className="relative h-12 w-1.5 overflow-hidden rounded-full">
            <div className="z-10 h-1/4 w-full rounded-full bg-slate-500 duration-500" />
            <div className="z-0 h-full w-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
