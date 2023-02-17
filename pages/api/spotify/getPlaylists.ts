import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const { accessToken } = req.query

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    })

    const playlists = await response.json()

    if (!response.ok) throw playlists

    res.status(200).json({ playlists })
  }

  catch (error) {
    res.status(400).json({ error })
  }

}