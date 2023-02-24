import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken, playlist, track } = req.query
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist}/tracks`,
      {
        method: "DELETE",
        body: JSON.stringify({
          tracks: [
            {
              uri: track,
            },
          ],
        }),
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
    res.status(400).json({ error, accessToken, playlist, track })
  }
}
