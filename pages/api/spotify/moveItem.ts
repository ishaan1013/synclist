import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken, playlist, start, insert } = req.query

  if (typeof start === "string" && typeof insert === "string") {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
        {
          method: "PUT",
          body: JSON.stringify({
            range_start: parseInt(start),
            insert_before: parseInt(insert),
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: "application/json",
          },
        }
      )
      const data = await response.json()
      if (!response.ok) throw data

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
