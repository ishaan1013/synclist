import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Head from "next/head"
import Link from "next/link"

const Page404 = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden px-3 xs:px-6 sm:px-12">
      <Head>
        <title>SyncList</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full max-w-screen-lg flex-col items-center">
        <div className="text-center text-5xl">404: You're lost.</div>
        <div className="mt-8 flex space-x-4">
          <Link href="/">
            <Button size="lg">
              Go Home <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page404
