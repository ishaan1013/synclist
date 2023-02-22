import NextAuth, { Session, TokenSet, User } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import SpotifyProvider from "next-auth/providers/spotify"
import { prisma } from "@/lib/prisma"

// Your NextAuth secret (generate a new one for production)
// More info: https://next-auth.js.org/configuration/options#secret
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public",

      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      const [spotify] = await prisma.account.findMany({
        where: { userId: user.id },
      })
      if (
        spotify.expires_at &&
        spotify.expires_at < Math.floor(Date.now() / 1000)
      ) {
        console.log(
          spotify.expires_at,
          " is less than ",
          Math.floor(Date.now() / 1000)
        )
        // If the access token has expired, try to refresh it
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: process.env.SPOTIFY_CLIENT_ID as string,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
                grant_type: "refresh_token",
                refresh_token: spotify.refresh_token ?? "",
              }),
              method: "POST",
            }
          )

          const tokens: TokenSet = await response.json()

          if (!response.ok) throw tokens

          console.log("Refreshed access token", tokens)

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor((Date.now() + 3600000) / 1000),
              refresh_token: tokens.refresh_token ?? spotify.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "spotify",
                providerAccountId: spotify.providerAccountId,
              },
            },
          })
        } catch (error) {
          console.error("Error refreshing access token", error)
        }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
