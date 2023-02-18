import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const { accessToken, id } = req.query

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    })

    const songs = await response.json()

    if (!response.ok) throw songs

    res.status(200).json({ songs })
  }

  catch (error) {
    res.status(400).json({ error })
  }

}