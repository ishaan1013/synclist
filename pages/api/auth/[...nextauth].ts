import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import SpotifyProvider from "next-auth/providers/spotify";
import { prisma } from "@/lib/prisma";

// Your NextAuth secret (generate a new one for production)
// More info: https://next-auth.js.org/configuration/options#secret
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string;

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
    })
  ]
};

export default NextAuth(authOptions);