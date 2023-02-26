import "../styles/globals.css"
import type { AppProps } from "next/app"
import localFont from "@next/font/local"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toast"

export const circular = localFont({
  variable: "--circular-font",
  src: [
    {
      path: "../styles/CircularBook.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/CircularBookItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/CircularLight.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/CircularLightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../styles/CircularMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/CircularMediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../styles/CircularBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/CircularBoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../styles/CircularBlack.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../styles/CircularBlackItalic.woff",
      weight: "800",
      style: "italic",
    },
  ],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={circular.className}>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </SessionProvider>
  )
}
