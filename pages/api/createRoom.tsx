import type { NextApiRequest, NextApiResponse } from "next"
import { nanoid } from "nanoid"
import { prisma } from "@/lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST" })
    return
  }

  const { playlist } = req.query

  if (typeof playlist !== "string") {
    res.status(400).send({ message: "Playlist must be a string" })
    return
  }

  try {
    const roomId = nanoid()

    await prisma.room.create({
      data: {
        id: roomId,
        playlist,
      },
    })

    res.status(200).json({ roomId })
  } catch (error) {
    res.status(400).json({ error })
  }
}
