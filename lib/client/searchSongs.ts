import { Dispatch } from "react"

export const searchSongs = async (
  q: string,
  accessToken: string,
  setSongs: Dispatch<React.SetStateAction<any>>
) => {
  // console.log("accessToken", accessToken)
  // console.log("q", q)
  const res = await fetch(
    `/api/spotify/searchSongs?q=${q}&accessToken=${accessToken}`
  )
  const json = await res.json()
  setSongs(json.songs?.tracks?.items)
}
