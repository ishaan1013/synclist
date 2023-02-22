import songType from "../songType"

export const deleteSong = async (
  playlist: string,
  trackId: string,
  accessToken: string,
  songs: songType[],
  setSongs: (songs: songType[]) => void
) => {
  const res = await fetch(
    `/api/spotify/deleteItem?playlist=${playlist}&track=${trackId}&accessToken=${accessToken}`
  )
  const json = await res.json()
  const newSongs = songs.filter((song) => song.id !== trackId)
  setSongs(newSongs)
  return json
}
