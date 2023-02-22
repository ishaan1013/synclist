import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST" })
    return
  }

  try {
    const { accessToken, playlist, track } = req.query

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=${track}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: "application/json",
        },
      }
    )
    const data = await response.json()
    if (!response.ok) throw data

    res.status(200)
  } catch (error) {
    res.status(400).json({ error })
  }
}
